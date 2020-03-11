const express           = require('express');
const handleAsync       = require('src/handleAsync');
const Subscription      = require('src/subscription');

// const webpush           = require('web-push');
// const notifications     = require('data.json');

class ApiRouter {
    constructor() {
        this._router = express.Router();

        this._router.post('/subscribe', handleAsync(this.create));
        this._router.get('/list', handleAsync(this.list));
        this._router.delete('/removeAll', handleAsync(this.removeAll));
    }

    async list(req, res) {
        const data = await Subscription.getAll();
        res.send({data});
    }

    async create(req, res) {
        const subscription = req.body;
        if (subscription) {
            await Subscription.create({
                subscription: JSON.stringify(subscription),
                createdAt: Date.now(),
                lastExecution: Date.now(),
                messageIndex: 0,
                interval: 1,
                errors: 0
            });
        }
        res.status(201).json({});
    }

    async remove(req, res) {
        const {id} = req.params;
        const success = await Subscription.remove(id);
        res.send({success});
    }

    async removeAll(req, res) {
        const success = await Subscription.removeAll();
        res.send({success});
    }

    init(app) {
        app.use('/', this._router);
    }
}

module.exports = new ApiRouter();