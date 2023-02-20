import EventTrigger from "./notifier-base";
import PaasPortalNotification from "./paasportal/app/paas-portal-notification";
import { TeamNofifier } from "./teams/app-copy/team-notification";

export class NotifierHelper {

    public StartNotify() {
        const listNotifications: EventTrigger[] = [new TeamNofifier(), new PaasPortalNotification()];
        listNotifications.forEach(notifier => {
            notifier.Start();
        })
    }
} 
