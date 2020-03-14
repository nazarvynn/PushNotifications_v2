const express           = require('express');
const webpush           = require('web-push');
const cors              = require('cors');
const path              = require('path');

const config            = require('config');
const PORT              = config.get('port');
const INTERVAL          = config.get('interval'); // in minutes
const EMAIL             = config.get('email');
const CORS_ORIGIN       = config.get('corsOrigin');
const PUBLIC_VAPID_KEY  = config.get('publicVapidKey');
const PRIVATE_VAPID_KEY = config.get('privateVapidKey');

const apiRouter         = require('src/api');
const cron              = require('src/cron');

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

        webpush.setVapidDetails(`mailto:${EMAIL}`, PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

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