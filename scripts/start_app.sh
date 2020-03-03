#!/bin/sh
./scripts/setEnvs.sh
echo "Re-Iniciando aplicacao logs em: aceleradora-admin.log"
killall node
node index.js >> aceleradora-admin.log &