# Push Notifications

## Clone application
`$ git clone https://github.com/nazarvynn/PushNotifications_v2.git`

## Install
### NodeJS >= 10.13.0
### NPM >= 6.4.1
### Postgres >= 8.5.1
### Knex
`$ sudo npm install -g knex`
### Dependencies
```
$ cd PushNotifications_v2/server
$ npm i
```

## Postgres
Install Postgres
```
$ sudo apt update
$ sudo apt -y upgrade
$ sudo apt install postgresql postgresql-client
```

Start Postgres
```
$ sudo systemctl stop postgresql.service
$ sudo systemctl start postgresql.service
$ sudo systemctl enable postgresql.service
$ sudo systemctl status postgresql.service
```

Set password for Postgres
`$ sudo passwd postgres`

Set password for `postgres` user
```
$ sudo -u postgres psql postgres
\password postgres
// enter password
\q
```

Create user
`$ sudo -u postgres createuser --interactive --pwprompt`

Create DB
`$ sudo -u postgres createdb pn-db`

Postgres home
`/usr/lib/postgresql/12/bin`


## DB Migrate
```
$ cd PushNotifications_v2/server
$ knex migrate:latest
```

## Start server
```
$ cd PushNotifications_v2/server
$ npm start
```
