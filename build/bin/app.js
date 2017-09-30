#!/usr/bin/node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow = require("meow");
const parser_1 = require("../lib/parser");
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
parser_1.readFile(cli.flags.in).then((result) => __awaiter(this, void 0, void 0, function* () {
    const processed = parser_1.processDrinkList(result);
    yield parser_1.writeOutput(cli.flags.out, processed);
})).catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
