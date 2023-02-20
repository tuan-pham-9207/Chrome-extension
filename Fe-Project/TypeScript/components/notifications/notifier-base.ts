import { JobNotificationOption } from "./teams/app-copy/team-notification";
declare global {
    interface Window {
        notifierCheckerId: NodeJS.Timer;
        intervalReset: NodeJS.Timer
    }
}
export default abstract class EventTrigger {
    protected interval: number;
    notifierCheckerId?: NodeJS.Timer;
    shouldStopNotice?: boolean;
    intervalReset: NodeJS.Timer;
    notifierTimes: number;
    resetTimes: number;
    constructor() {
        this.interval = 5 * 60 * 1000;
        this.notifierTimes = 0;
        this.resetTimes = 0;

    }
    protected abstract toolPrefix: string;
    private RunNotifier(runAfterMiliseconds = 10) {
        let notifierCheckerId: NodeJS.Timeout = undefined;
        if (window.location.href.startsWith('https://store-site')) {
            notifierCheckerId = setTimeout(async () => {

                this.notifierTimes++;
                console.groupCollapsed();
                console.log(`start notifier times ${this.notifierTimes} with reset times ${this.resetTimes} after`, runAfterMiliseconds, new Date())
                clearTimeout(notifierCheckerId)
                new Notification('tititititititi', {
                    body: `notification at ${new Date().toLocaleTimeString()}`
                })
                // await this.notifier();
                console.groupEnd();
            }, runAfterMiliseconds)
        } else {
            this.RemoveAll();
        }

    }

    protected RemoveAll() {
        clearInterval(window.intervalReset);
        this.clearOldJob();
    }

    public async Start() {
        if (!this.shouldRun()) {
            console.log(`wont run ${this.toolPrefix}`)
            return;
        }
        this.RunNotifier();
        setInterval(() => {
            this.ResetNotifier();
        }, this.interval)


    }

    public async ResetNotifier() {
        this.resetTimes++;
        this.clearOldJob();
        this.ResetData();
        this.RunNotifier(5 * 1000 * 60)
    }

    protected abstract ResetData(): void;

    protected clearOldJob() {
        clearTimeout(window.notifierCheckerId);
        window.notifierCheckerId = undefined;
    }

    public async StopNofifier() {
        clearTimeout(window.notifierCheckerId);
        this.shouldStopNotice = true;
    }

    protected async notifier() {
        const jobOptions = await this.getJobNotification();
        if (jobOptions?.notificationOptions) {
            if (Notification.permission !== "granted") {
                const requestPermission = await Notification.requestPermission() as string;
                if (requestPermission !== "granted") {
                    alert("This page is not allowed notifications,notifier tool won't work");
                    return;
                }
            }
            const notification = new Notification('Notifier helper', {
                // icon: chrome.runtime.getURL('penguin.jpg'),
                icon: "https://lh3.googleusercontent.com/VykY8YriaQ4CeX5WAfu5jIgwBYMA9M-QFdkcYv8WmiNXrRp0ZtKPTxLa_olxSo7IlW-yBeClRPIdVFGwtgwOxvT1mIcEAXDaWyH27ctiRM4U53ivWipLG8YQxfCteaKfAXYYr2bA07ggxLuK-oX1XL6TxzxDbS08aMMQz9DU3fuKcAfD_8QMdhYPGL8DUUbVv2O_hUdoD7RVz7cLxYgxYkIYp2XAODUG31y1VevXV_1gDOVB-O3uHbcqPNd2Brnbm8EyDW_sLxyDSUGoD4tk7eKkewDtdeLiaqaWbtQNzG5P_jLwh7KEiVZml4dq9g5Yk4tscyjIgSvztgFo-WbVKX9edCc-TLhd6JgTPs6YPn0Ont2cbGoloAZ-VRGvTxJI_HlooOWjJiLW6KaTRBXrX13loNE3kNZRhqfbgTWswLnYglS8CR7rJksMafA8mAInsq4bCTKCj3Qv-ijG1i2WoyprJ7lHzT5ZgmQLsmjxALdLDnE50hbfhYUCftoY6wMl5ti9lZN_OxARdC5yBkOIfM6CwCjV2RO9nWsTIYYfNLHou2SneOC8G-5Ppobe_8OwcfoYbEXfG-M81B8yDIMPe5NbQRGZzCkJDp9aF0CUsyuTh7Q1vyljwRPbeA3a9VsH98NTyPHqa3hpnCHFuCWo1JNmo6vmcVb4YohiBg8iVaTX_HgqxzK3OCkvPMEMQly9LhVlFgrIoC75Id0wiDqQpAgk7toVlDncZFaiPlYzb5uS6hAZ6nwz1H7_SKAo6IsFvEFPuuQ5VNFeCOu2qshqkdo8pyC5yVMrrWi4tNTESDDYONMyfjyJPd67DWIGqDArsvQhd_GmOuC0XwhWc3GTKYN0RQhihmVkCzL-P2Jabm9BA6_d61c6I0fvHRjUnJ6DRneui5Y84IEjRkLZFCZpK2iYJ8OlonMJNHOf0uuQwDkx7u8Y=s328-no?authuser=0",
                ...jobOptions.notificationOptions
            });
            this.populateNotificationEvent(notification)

        }
        const nextTriggerAfter = jobOptions?.nextTriggerAfter;
        if (nextTriggerAfter) {
            console.log(`run after ${nextTriggerAfter / 1000 / 60} minutes, equivalent ${nextTriggerAfter / 1000} seconds, at ${new Date(nextTriggerAfter + Date.now())}`)
            this.RunNotifier(nextTriggerAfter);
        }

    }

    protected populateNotificationEvent(notification: Notification): void {
        notification.addEventListener('click', () => {
            window.focus();
        })
    }

    protected async refreshActor() {

    }

    protected abstract getJobNotification(): Promise<JobNotificationOption | undefined>;

    protected abstract shouldRun(): boolean;

    protected triggerStopNotice() {
    }

}




