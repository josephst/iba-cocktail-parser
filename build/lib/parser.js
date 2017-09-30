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
const fs = require("graceful-fs");
const categoryConverter_1 = require("./categoryConverter");
const readFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err) => {
            if (err) {
                reject(err);
                return;
            }
            fs.readFile(filePath, 'UTF-8', (readErr, data) => {
                if (readErr) {
                    reject(readErr);
                    return;
                }
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                }
                catch (parseErr) {
                    reject(parseErr);
                }
            });
        });
    });
});
exports.readFile = readFile;
const processDrinkList = (inputDrinks) => {
    return inputDrinks.map((inputDrink, index) => {
        const { name, preparation, ingredients, glass } = inputDrink;
        const parsedIngredients = ingredients.map((inputIngredient) => {
            if (isSpecialIngredient(inputIngredient)) {
                return ({
                    name: inputIngredient.special,
                    quantity: 0,
                    type: 'Unknown',
                });
            }
            return ({
                name: inputIngredient.label || inputIngredient.ingredient,
                quantity: inputIngredient.amount,
                type: 'Unknown',
                unit: inputIngredient.unit,
            });
        });
        const parsed = {
            dateCreated: (new Date()).toLocaleDateString(),
            default: true,
            details: {
                category: categoryConverter_1.convertCategory(name),
                color: 'TODO',
                glassType: glass,
                ice: 'TODO',
            },
            favorite: false,
            hidden: false,
            id: 1000 + index,
            ingredients: parsedIngredients,
            name,
            source: 'IBA Official Cocktail',
            steps: preparation,
        };
        return parsed;
    });
};
exports.processDrinkList = processDrinkList;
const writeOutput = (outPath, drinks) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, JSON.stringify(drinks, null, 2), (err) => {
            err ? reject(err) : resolve();
        });
    });
});
exports.writeOutput = writeOutput;
const isSpecialIngredient = (ingredient) => {
    return ingredient.special !== undefined;
};
