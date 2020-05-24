#!/bin/sh
sudo apt-get update &&
sudo apt-get install ansible && 
wget https://raw.githubusercontent.com/tuto/tenpo-test/master/scripts/ansible/dbplaybook.yml &&
ansible-playbook playbook.yml -i localhost