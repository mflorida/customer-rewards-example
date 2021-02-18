#!/usr/bin/env node

const fs = require('fs');

// create the 'customers.json' file
require('./createCustomers.js')

// parse 'customers.json' file
const customerDataInput = JSON.parse(fs.readFileSync('../public/data/customers.json').toString());

// randomize the max value for wider range of values
function randomMax(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// generate random amounts spent
function randomAmount(){
    const min = 10;
    const max = randomMax(50, 500);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateRewards(amount){
    let over100, over50;
    if (amount > 100) {
        over100 = amount - 100;
        over50  = 50;
    }
    else {
        over100 = 0;
        over50  = amount > 50 ? amount - 50 : 0;
    }
    return over50 + (over100 * 2);
}

// generate a random number (minimum of 1, max of 9) of transactions
function generateTransactions(min, max){
    const counter = randomMax(min || 1, max || 9);
    const output  = [];
    let i         = -1;
    while (++i < counter) {
        output.push(randomAmount())
    }
    return output;
}

// add random amount to customer data
function generateCustomerData(monthCount){

    monthCount = monthCount || 3;

    return customerDataInput.map(function(customer, i){

        let count = -1;

        // months of amounts spent, with varying numbers of transactions
        const months = [];

        while (++count < monthCount) {
            months.push(generateTransactions())
        }

        // do data calculations on the 'back end' - in this case when
        // generating the source JSON data file

        customer.amounts = months.map(function(month, i){
            const obj          = {
                count: month.length,
                spent: month,
                rewards: month.map(calculateRewards)
            };
            obj.totals         = {};
            obj.totals.spent   = obj.spent.reduce((prev, curr) => prev + curr);
            obj.totals.rewards = obj.rewards.reduce((prev, curr) => prev + curr);
            return obj
        });

        return customer
    })
}

fs.writeFileSync('../public/data/customerData.json', JSON.stringify(generateCustomerData(3), null, 2))
