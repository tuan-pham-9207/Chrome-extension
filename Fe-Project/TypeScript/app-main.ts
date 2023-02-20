import { NotifierHelper } from "./components/notifications/main";

window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('start version 3')
        const notifierHelper = new NotifierHelper();

        notifierHelper.StartNotify();
    }, 1000);
})
