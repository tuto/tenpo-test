#!/bin/sh
sudo apt clean &&
sudo apt autoclean &&
sudo apt update &&
sudo apt-get install wget ca-certificates --assume-yes &&
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - && 
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' &&
sudo apt-get update &&
sudo apt-get install postgresql postgresql-contrib --assume-yes &&
wget https://raw.githubusercontent.com/tuto/tenpo-test/master/scripts/bd/commands.sql &&
sudo -u postgres createdb tenpo-api &&
sudo -u postgres psql -d tenpo-api -a -f commands.sql 