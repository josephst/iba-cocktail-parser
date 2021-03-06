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
const uuid_1 = require("uuid");
const categoryConverter_1 = require("./categoryConverter");
const readFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, err => {
            if (err) {
                reject(err);
                return;
            }
            fs.readFile(filePath, "UTF-8", (readErr, data) => {
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
const processDrinkList = inputDrinks => {
    return inputDrinks.map((inputDrink) => {
        const { name, preparation, ingredients, glass } = inputDrink;
        const parsedIngredients = ingredients.map(inputIngredient => {
            if (isSpecialIngredient(inputIngredient)) {
                return {
                    name: inputIngredient.special,
                    quantity: 0,
                    type: "Unknown",
                    unit: null
                };
            }
            else {
                let unit;
                switch (inputIngredient.unit) {
                    case "cl":
                        unit = "cL";
                        break;
                    case "ml":
                        unit = "mL";
                        break;
                    default:
                        unit = inputIngredient.unit;
                        break;
                }
                return {
                    name: inputIngredient.label || inputIngredient.ingredient,
                    quantity: inputIngredient.amount,
                    type: "Unknown",
                    unit
                };
            }
        });
        const parsed = {
            dateCreated: new Date().toLocaleDateString(),
            default: true,
            details: {
                category: categoryConverter_1.convertCategory(name),
                color: "TODO",
                glassType: glass,
                ice: "TODO"
            },
            favorite: false,
            hidden: false,
            id: uuid_1.v1(),
            ingredients: parsedIngredients,
            name,
            source: "IBA Official Cocktail",
            steps: preparation || "No instructions given"
        };
        return parsed;
    });
};
exports.processDrinkList = processDrinkList;
const writeOutput = (outPath, drinks) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const output = { drinks };
        fs.writeFile(outPath, JSON.stringify(output, null, 2), err => {
            err ? reject(err) : resolve();
        });
    });
});
exports.writeOutput = writeOutput;
const isSpecialIngredient = (ingredient) => {
    return ingredient.special !== undefined;
};
