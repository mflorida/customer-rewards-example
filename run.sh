#!/usr/bin/env bash

cd utils

# generate fresh customer data
./createRewardsData.js

cd .. || exit

# start the web app
npm start
