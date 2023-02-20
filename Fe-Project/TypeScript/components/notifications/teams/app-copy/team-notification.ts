import EventTrigger from "../../notifier-base";
export class TeamNofifier extends EventTrigger {
    protected toolPrefix: string;

    _token: undefined;
    _storageTimToLive: number;
    _storageKey: string;
    _teamStorageKeySuffix: string;
    _calanderApi: string;
    dateTicks: number;
    todayTime: Date;
    todayBeginTime: Date;
    todayEndTime: Date;
    private _baseUrl: string;
    meetings: TeamMetting[];
    private _reset: boolean;
    lastNotifyMeeting: TeamMetting | undefined;
    constructor() {
        super();
        this.interval = 6 * 60 * 1000;
        this._token = undefined;
        this._storageTimToLive = 1000 * 60 * 3; // 5 mins
        this._storageKey = 'calander_custom';
        this._teamStorageKeySuffix = "cache.token.https://api.spaces.skype.com";
        this._baseUrl = 'https://teams.microsoft.com';
        this._calanderApi = 'https://teams.microsoft.com/api/mt/part/emea-03/beta/me/calendarEvents';
        this.dateTicks = 1000 * 60 * 60 * 24;
        this.todayTime = new Date();
        this.todayBeginTime = new Date(Math.floor(this.todayTime as any / this.dateTicks) * this.dateTicks);
        this.todayEndTime = new Date(this.todayBeginTime as any / 1 + this.dateTicks - 1);
        localStorage.removeItem(this._storageKey);
        this.meetings = [];
        this.toolPrefix = "TeamNofifier";
        this._reset = true;
        this.lastNotifyMeeting = undefined;

    }

    protected ResetData(): void {
        localStorage.removeItem(this._storageKey);
        this._reset = true;
    }

    protected async getJobNotification(): Promise<JobNotificationOption | undefined> {
        let result: JobNotificationOption = {};
        console.log('start get notification of ', this.toolPrefix)
        const todayMeetings = await this.getOrCreateCalanderOnStorage();

        if (!todayMeetings || !todayMeetings.length) {
            return result;
        }
        let closestMeeting: TeamMetting | undefined;
        const checkedTime = new Date() as any;

        const modifiedMessage = this._getCheckModifiedrMeetingMessage(todayMeetings, checkedTime);
        if (modifiedMessage) {
            return {
                nextTriggerAfter: 1 * 1000,
                notificationOptions: {
                    body: `Meetings are up to date ${modifiedMessage},\n click for more detail`
                }

            }
        }

        let startAfter = 0;
        const lastTimeNotify = this.lastNotifyMeeting?.startTime ?? checkedTime;
        const meetingsAfterCheckedTime = todayMeetings.filter(m => {
            return Math.round((m.startTime as any - lastTimeNotify) / 1000) > -1;
        })

        result.nextTriggerAfter = 10 * 1000;
        closestMeeting = meetingsAfterCheckedTime.at(0);

        let nextTriggerAfter = undefined;
        let nextMetting = meetingsAfterCheckedTime.at(1);
        // console.groupCollapsed();
        if (closestMeeting) {
            nextTriggerAfter = 10 * 1000;
            startAfter = Math.round((closestMeeting.startTime as any - checkedTime) / 1000);


            if (startAfter <= 15) {
                this.lastNotifyMeeting = closestMeeting;
                result.notificationOptions = {
                    body: `Meeting "${closestMeeting.title}"\nwill start after ${startAfter} seconds \nat ${closestMeeting.startTime.toLocaleTimeString()}`
                };

            } else {
                nextMetting = closestMeeting;
            }

            if (nextMetting) {
                nextTriggerAfter = Math.max(nextMetting.startTime as any - checkedTime - 10 * 1000, nextTriggerAfter);
            }

            result.nextTriggerAfter = nextTriggerAfter;
            console.log('closest meeeintg, start after ,result', closestMeeting, startAfter, result)
        } else {

            result.notificationOptions = {
                body: 'There is no meeting from now,\nwill notify if has new meeting'
            };
            console.log('there is no meeting from now');
        }

        // console.groupEnd();
        return result;
    }

    private _getCheckModifiedrMeetingMessage(todayMeetings: TeamMetting[], checkedTime: Date): string {
        let modifyMessage = ``;

        if (this._reset) {
            this._reset = false;
            this.meetings = this.meetings.filter(m => {
                return Math.round((m.startTime as any - (checkedTime as any)) / 1000) > -1;
            })
            const removedMeetings = this.meetings.filter(m => todayMeetings.every(n => n.objectId !== m.objectId));
            const newCreatedMeeting = todayMeetings.filter(m => this.meetings.every(n => n.objectId !== m.objectId));
            this.meetings = todayMeetings;
            if (removedMeetings.length) {
                let index = 0;
                modifyMessage += `removed ${removedMeetings.length}\n`;
                removedMeetings.forEach(remove => {
                    modifyMessage += `${index == 0 ? '' : ','} ${remove.title} at ${remove.startTime.toLocaleTimeString()}`;
                })
            }

            if (newCreatedMeeting.length) {
                let index = 0;
                modifyMessage += `added ${newCreatedMeeting.length} \n`;
                newCreatedMeeting.forEach(add => {
                    modifyMessage += `${index == 0 ? '' : ','} ${add.title} at ${add.startTime.toLocaleTimeString()}`;
                })
            }

        }
        return modifyMessage;
    }

    protected populateNotificationEvent(notification: Notification): void {
        notification.addEventListener('click', () => {
            window.focus();
            window.location.hash = '/calendarv2';
            // window.open(`${this._baseUrl}/_#/calendarv2`)
        })
    }
    protected shouldRun(): boolean {
        return window.location.href.startsWith(this._baseUrl)
    }

    private async getOrSetToken() {
        if (this._token) {
            return this._token;
        }

        const localStorageTokenKey = Object.keys(localStorage).find(m => m.endsWith(this._teamStorageKeySuffix));
        if (localStorageTokenKey) {
            const stringData = localStorage.getItem(localStorageTokenKey);
            if (stringData) {
                const tokenKey = JSON.parse(stringData)?.token;
                this._token = tokenKey;
            }
        }
        return this._token;
    }

    private async getTodayCalander(): Promise<TeamMetting[]> {
        const tokenKey = await this.getOrSetToken();
        if (tokenKey) {
            const calendarResponse = await fetch(`${this._calanderApi}?StartDate=${this.todayBeginTime.toUTCString()}&EndDate=${this.todayEndTime.toUTCString()}`,
                {
                    headers: {
                        'authorization': `Bearer ${tokenKey}`
                    },

                })
            if (calendarResponse.ok) {
                const jsonData = await calendarResponse.json();
                const checkedTime = Date.now();
                const todayMeetings = jsonData.value.map((m: any) => {
                    return {
                        startTime: new Date(m.startTime),
                        title: m.subject,
                        objectId: m.objectId
                    } as TeamMetting

                }).filter((m: TeamMetting) => {
                    return Math.round((m.startTime as any - checkedTime) / 1000) > -1;
                });
                return todayMeetings;

            }
        }
        return [];
    }

    private async getOrCreateCalanderOnStorage(): Promise<TeamMetting[] | undefined> {

        let meetingCache = undefined;
        let storageItem = localStorage.getItem(this._storageKey);
        if (storageItem) {
            const jsonData = JSON.parse(storageItem);
            const expiredTime = jsonData.expiredTo;
            const checkedTime = new Date();
            if (expiredTime < checkedTime) {
                localStorage.removeItem(this._storageKey);
                meetingCache = undefined;

            } else {
                meetingCache = jsonData.meetings.map((m: any) => {
                    return {
                        ...m,
                        startTime: new Date(m.startTime),
                    } as TeamMetting
                });
            }
        }
        if (!meetingCache) {
            const todayMeetings = await this.getTodayCalander();
            if (todayMeetings) {
                const meetingsToSave = {
                    expiredTo: Date.now() + this._storageTimToLive,
                    meetings: todayMeetings
                };
                meetingCache = todayMeetings;
                localStorage.setItem(this._storageKey, JSON.stringify(meetingsToSave));
            }
        }
        return meetingCache;
    }
}

export type TeamMetting = {
    title: string;
    startTime: Date;
    objectId: string;
}

export type JobNotificationOption = {
    notificationOptions?: NotificationOptions,
    nextTriggerAfter?: number;
}