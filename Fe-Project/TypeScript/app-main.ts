import { NotifierHelper } from "./components/notifications/main";
import OutlookNotification from "./components/notifications/outlook/outlook-notification";

window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('start version 3')
        new OutlookNotification().InjectEventTrigger();
        const notifierHelper = new NotifierHelper();

        notifierHelper.StartNotify();
    }, 1000);
})
