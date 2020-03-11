const webpush           = require('web-push');
const notifications     = require('data.json');
const handleAsync       = require('src/handleAsync');
const Subscription      = require('src/subscription');

class Cron {
    start(interval) {
        this.interval = interval * 60 * 1000;
        this.counter = 1;
        this.cron();
    }

    stop() {
        clearTimeout(this.timer);
    }

    cron() {
        this.timer = setTimeout(() => {
            handleAsync(this.handler.bind(this))();
            this.cron();
        }, this.interval);
    }

    async handler() {
        console.log(`counter: ${this.counter++}`);
        const allSubscriptions = await Subscription.getAll();
        allSubscriptions.forEach(handleAsync(this.iterator.bind(this)));
    }

    async iterator(value) {
        const {id, subscription, createdAt, lastExecution, messageIndex, interval, errors} = value;
        const hoursDiff = this.hoursDiff(lastExecution, Date.now());
        if (hoursDiff >= interval) {
            handleAsync(this.sendNotification.bind(this, {id, subscription, messageIndex, errors}))();
            handleAsync(this.updateSubscription.bind(this, {id, messageIndex, interval}))();
        }
    }

    hoursDiff(dateA, dateB) {
        return Math.round(Math.abs(dateA - dateB) / 36e5);
    }

    async sendNotification({id, subscription, messageIndex, errors}) {
        const payload = JSON.stringify(notifications[messageIndex]);
        webpush.sendNotification(JSON.parse(subscription), payload).catch(async function (error) {
            console.error(id, error.stack);
            await Subscription.update({id}, {errors: errors + 1});
            if (errors >= 10) {
                await Subscription.remove({id});
            }
        });
    }

    async updateSubscription({id, messageIndex, interval}) {
        const messageIdx = (notifications.length - 1) === messageIndex ? 0 : messageIndex + 1;
        await Subscription.update({id}, {
            lastExecution: Date.now(),
            messageIndex: messageIdx,
            interval
        });
    }
}

module.exports = new Cron();