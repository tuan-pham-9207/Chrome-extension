import EventTrigger from "../../notifier-base";
import { JobNotificationOption } from "../../teams/app-copy/team-notification";

export default class DevOpsDeploymentNotification extends EventTrigger {
    protected toolPrefix: string;
    protected ResetData(): void {
    }
    protected async getJobNotification(): Promise<JobNotificationOption> {
        let result = {} as JobNotificationOption;

        return result;
    }
    protected shouldRun(): boolean {
        return window.location.href.startsWith("https://ericsson-web.visualstudio.com/");
    }

}