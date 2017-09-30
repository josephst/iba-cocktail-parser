#!/usr/bin/node

import * as meow from 'meow';

import { processDrinkList, readFile, writeOutput } from '../lib/parser';

const cli = meow(`
  Usage
    $ parser --in <inputFilePath> --out <outputFilePath>

  Examples
    $ parser -i input.json -o output.json
`, {
    alias: {
      in: 'i',
      out: 'o',
    },
    default: {
      out: 'output.json',
    },
  });

readFile(cli.flags.in).then(async (result) => {
  const processed = processDrinkList(result);
  await writeOutput(cli.flags.out, processed);
}).catch((err: Error) => {
  // tslint:disable-next-line:no-console
  console.log(err);
});
