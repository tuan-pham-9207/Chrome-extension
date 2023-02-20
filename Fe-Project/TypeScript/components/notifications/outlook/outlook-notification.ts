import Helper from "../base-helper/helper";
import EventTrigger from "../notifier-base";
import { JobNotificationOption } from "../teams/app-copy/team-notification";

export default class OutlookNotification {
    /**
     *
     */
    constructor() {

    }
    protected toolPrefix: string = "OutlookNotification";

    public async InjectEventTrigger() {
        if (!window.location.href.startsWith('https://outlook.office.com/')) {
            console.log("outlook notification helper won't run on this domain")
            return;
        }
        const elementGetter = () => {
            return document.querySelector('#fluent-default-layer-host [aria-live="polite"] div');
        }

        const targetNode = await Helper.waitForElementReady(elementGetter);
        // Select the node that will be observed for mutations


        // Options for the observer (which mutations to observe)
        const config = { childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback: MutationCallback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(async addedChild => {
                        const message = (addedChild as HTMLElement).innerText;
                        if (Notification.permission !== "granted") {
                            const requestPermission = await Notification.requestPermission() as string;
                            if (requestPermission !== "granted") {
                                alert("This page is not allowed notifications,notifier tool won't work");
                                return;
                            }
                        }
                        new Notification("Outlook notification helper", {
                            body: message,
                            icon: "https://lh3.googleusercontent.com/VykY8YriaQ4CeX5WAfu5jIgwBYMA9M-QFdkcYv8WmiNXrRp0ZtKPTxLa_olxSo7IlW-yBeClRPIdVFGwtgwOxvT1mIcEAXDaWyH27ctiRM4U53ivWipLG8YQxfCteaKfAXYYr2bA07ggxLuK-oX1XL6TxzxDbS08aMMQz9DU3fuKcAfD_8QMdhYPGL8DUUbVv2O_hUdoD7RVz7cLxYgxYkIYp2XAODUG31y1VevXV_1gDOVB-O3uHbcqPNd2Brnbm8EyDW_sLxyDSUGoD4tk7eKkewDtdeLiaqaWbtQNzG5P_jLwh7KEiVZml4dq9g5Yk4tscyjIgSvztgFo-WbVKX9edCc-TLhd6JgTPs6YPn0Ont2cbGoloAZ-VRGvTxJI_HlooOWjJiLW6KaTRBXrX13loNE3kNZRhqfbgTWswLnYglS8CR7rJksMafA8mAInsq4bCTKCj3Qv-ijG1i2WoyprJ7lHzT5ZgmQLsmjxALdLDnE50hbfhYUCftoY6wMl5ti9lZN_OxARdC5yBkOIfM6CwCjV2RO9nWsTIYYfNLHou2SneOC8G-5Ppobe_8OwcfoYbEXfG-M81B8yDIMPe5NbQRGZzCkJDp9aF0CUsyuTh7Q1vyljwRPbeA3a9VsH98NTyPHqa3hpnCHFuCWo1JNmo6vmcVb4YohiBg8iVaTX_HgqxzK3OCkvPMEMQly9LhVlFgrIoC75Id0wiDqQpAgk7toVlDncZFaiPlYzb5uS6hAZ6nwz1H7_SKAo6IsFvEFPuuQ5VNFeCOu2qshqkdo8pyC5yVMrrWi4tNTESDDYONMyfjyJPd67DWIGqDArsvQhd_GmOuC0XwhWc3GTKYN0RQhihmVkCzL-P2Jabm9BA6_d61c6I0fvHRjUnJ6DRneui5Y84IEjRkLZFCZpK2iYJ8OlonMJNHOf0uuQwDkx7u8Y=s328-no?authuser=0",
                        })
                    })
                } else if (mutation.type === 'attributes') {
                    // console.log(`The ${mutation.attributeName} attribute was modified.`);
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }
}