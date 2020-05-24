#!/bin/sh
sudo apt-get update &&
sudo apt install software-properties-common && 
sudo apt-add-repository --yes --update ppa:ansible/ansible &&
sudo apt install ansible &&
wget https://raw.githubusercontent.com/tuto/tenpo-test/master/scripts/ansible/dbplaybook.yml &&
ansible-playbook playbook.yml -i localhost