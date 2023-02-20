import EventTrigger from "../../notifier-base";
import { JobNotificationOption } from "../../teams/app-copy/team-notification";

export default class PaasPortalNotification extends EventTrigger {
    protected toolPrefix: string;
    totalDeploymentStep: number;
    constructor() {
        super();
        this.totalDeploymentStep = 0;
        this.interval = 1000 * 10; // 30s
        this.toolPrefix = "PaasPortalNotification";
    }
    protected ResetData(): void {
    }

    protected async getJobNotification(): Promise<JobNotificationOption> {
        let result = {} as JobNotificationOption;
        const data = await (fetch('https://paasportal.episerver.net/projects/a839e1fb-2691-46be-92c0-aeed007b9ac2/recentsynchronizations'));
        if (data.ok) {
            const jsonData = await data.json();
            const firstJob = jsonData.synchronizations[0];
            if (firstJob.endTime) {
                return result;
            }
            const runningStatus = firstJob.status;
            if (runningStatus == 'AwaitingVerification' || runningStatus == 'Completed' || runningStatus == 'Succeeded') {
                this.totalDeploymentStep++;
                result.notificationOptions = {
                    body: "Deployment is done"
                }
            }

        }
        return result;
    }

    protected shouldRun(): boolean {
        return window.location.href.startsWith('https://paasportal.episerver.net/') && this.totalDeploymentStep < 2;
    }

}