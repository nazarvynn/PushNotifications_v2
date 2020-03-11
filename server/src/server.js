const express       = require('express');
const webpush       = require('web-push');
const cors          = require('cors');
const path          = require('path');
const apiRouter     = require('src/api');
const cron          = require('src/cron');

const PORT = 4000;
const INTERVAL = 1; // in minutes
const EMAIL = 'nazar.vynn@gmail.com';
const CORS_ORIGIN = 'http://localhost:8080';

class Server {
    constructor() {
        this._app = express();
        this._app.use(express.json());
        this._app.use('/', express.static(path.join(__basedir, '/public')));
        this._app.use(cors({
            origin(origin, cb) {
                const whitelist = [CORS_ORIGIN];
                cb(null, whitelist.includes(origin));
            },
            credentials: true
        }));
        apiRouter.init(this._app);

        const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
        const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
        webpush.setVapidDetails(`mailto:${EMAIL}`, publicVapidKey, privateVapidKey);

        cron.start(INTERVAL);
    }

    async start() {
        if (this._server) return;
        this._server = this._app.listen(PORT, () => {
            console.log(`Server started \r\nlocalhost:${PORT}`);
        });
    }

    async stop() {
        if (!this._server) return;
        await new Promise(resolve => this._server.close(resolve));
        this._server = null;
    }
}

module.exports = new Server();