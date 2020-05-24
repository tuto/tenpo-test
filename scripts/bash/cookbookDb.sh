#!/bin/sh
sudo apt-get update &&
sudo apt install postgresql --assume-yes &&
sudo -u postgres createdb tenpo-api &&
wget https://raw.githubusercontent.com/tuto/tenpo-test/master/scripts/bd/commands.sql &&
sudo -u postgres psql tenpo-api &&
\i commands.sql