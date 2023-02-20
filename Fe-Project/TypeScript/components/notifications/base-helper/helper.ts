export default class Helper {
    public static async delay(time = 100) {
        return new Promise(r => {
            setTimeout(() => {
                r(true)
            }, time)
        });
    }

    public static async waitForElementReady(elementGetter: () => Element, intervalChecking = 200, maxWaitCountTime = 2000): Promise<Element> {
        return new Promise((resolve, reject) => {
            const startWait = new Date() as any;
            let intervalCheckId = setInterval(() => {
                const element = elementGetter();
                if (element) {
                    resolve(element);
                    clearInterval(intervalCheckId);
                    return;
                }

                if (new Date() as any > startWait + maxWaitCountTime) {
                    let errMessage = `wait time out after ${maxWaitCountTime} miliseconds`;
                    console.log(errMessage)
                    clearInterval(intervalCheckId);
                    throw new Error(errMessage)
                }

            }, intervalChecking)
        })
    }
}