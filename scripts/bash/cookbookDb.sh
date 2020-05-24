#!/bin/sh
sudo apt-get update &&
sudo apt install postgresql --assume-yes &&
sudo -u postgres createdb tenpo-api &&
sudo -u postgres psql tenpo-api
