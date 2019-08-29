#!/bin/sh
killall node
git pull
node index.js >> homework-delivery.log &