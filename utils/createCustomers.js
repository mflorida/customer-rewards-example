#!/usr/bin/env node

const fs = require('fs');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

function createFullName(){
    return uniqueNamesGenerator({
        dictionaries: [names, names],
        separator: '_',
        style: 'capital',
        length: 2
    });
}

// keep track of names to avoid duplicates
// the key will be 'firstname_lastname' format
// (easier to overwrite duplicate keys than check for duplicates in an array?)
let uniqueNameStore = {};

// safety check to prevent infinite loop in event of not being able to create 100 unique names
let counter = 0;

// create unique name based on key in uniqueNameStore object
function createUniqueName(){
    let fullName = createFullName();
    function nameKey(){
        return fullName.toLowerCase().replace(/\W/, '_');
    }
    // try again if it already exists
    if (uniqueNameStore[nameKey()]) {
        // unless we can't create a unique name after 1000 tries
        if (counter > 1000) return '';
        fullName = createFullName();
        counter += 1;
    }
    uniqueNameStore[nameKey()] = fullName;
    return fullName;
}

// make 100 of them!
function createUniqueNames(count){
    count = count || 100;
    // reset uniqueNameStore
    uniqueNameStore = {};
    let uniqueNames = -1;
    while (++uniqueNames < count) {
        createUniqueName();
    }
    return uniqueNameStore;
}

// create an array of customer objects
function createUniqueNamesList(count){
    const uniqueNames = createUniqueNames(count);
    return Object.keys(uniqueNames).map(function(nameKey, i){
        const nameParts = uniqueNames[nameKey].split('_')
        const first = nameParts[0];
        const last = nameParts[1];
        return {
            username: nameKey,
            firstName: first,
            lastName: last
        }
    });
}

function noop(){}

fs.writeFileSync('../public/data/customers.json', JSON.stringify(createUniqueNamesList(100), null, 2))
