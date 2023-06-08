#!/bin/sh

cd /client

su -c "pg_ctl start -D /var/lib/postgresql/data" postgres
nohup lite-server --baseDir="/client/dist/website-one" 2>&1 >> /var/log/ng.log &
node /server/index.js