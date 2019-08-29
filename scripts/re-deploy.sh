#!/bin/sh
killall node
git pull
node index.js >> omework-delivery.log &