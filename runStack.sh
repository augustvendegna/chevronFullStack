#!/bin/sh

cd /client
nohup lite-server --baseDir="/client/dist/website-one" 2>&1 >> /var/log/ng.log &
node /server/index.js