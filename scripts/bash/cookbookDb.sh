#!/bin/sh
sudo apt clean &&
sudo apt autoclean &&
sudo apt update && sudo apt upgrade
sudo apt install postgresql --assume-yes &&
sudo -u postgres createdb tenpo-api &&
wget https://raw.githubusercontent.com/tuto/tenpo-test/master/scripts/bd/commands.sql &&
psql -d postgress -a -f commands.sql 