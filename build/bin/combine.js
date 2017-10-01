#!/usr/bin/node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("graceful-fs");
const meow = require("meow");
const cli = meow(`
  Usage
    $ parser <file.json> <file2.json> ... <fileN.json> <output.json>

  Examples
    $ parser data/output/iba.json data/output/ownDrinks.json data/output/db.json
`);
const combiner = (inputs, output) => {
    let inputDrinks = [];
    for (const file of inputs) {
        const drinkCollection = JSON.parse(fs.readFileSync(file, 'UTF-8'));
        inputDrinks = inputDrinks.concat(drinkCollection.drinks);
    }
    fs.writeFileSync(output, JSON.stringify({ drinks: inputDrinks }, null, 2));
};
combiner(cli.input.slice(0, cli.input.length - 2), cli.input[cli.input.length - 1]);
