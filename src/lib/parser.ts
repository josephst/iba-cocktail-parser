import * as fs from 'graceful-fs';

import { convertCategory } from './categoryConverter';

import { Drink as OutputDrink, Ingredient as OutputIngredient } from '../drink.d';
import { InputDrink, SpecialIngredient } from '../inputDrink.d';

const readFile = async (filePath: string) => {
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
          const parsed: InputDrink[] = JSON.parse(data);
          resolve(parsed);
        } catch (parseErr) {
          reject(parseErr);
        }
      });
    });
  }) as Promise<InputDrink[]>;
};

const processDrinkList: (input: InputDrink[]) => OutputDrink[] = (inputDrinks) => {
  return inputDrinks.map((inputDrink, index) => {
    const { name, preparation, ingredients, glass } = inputDrink;
    const parsedIngredients = ingredients.map((inputIngredient) => {
      if (isSpecialIngredient(inputIngredient)) {
        return ({
          name: inputIngredient.special,
          quantity: 0,
          type: 'Unknown',
          unit: null,
        }) as OutputIngredient;
      } else {
        let unit;
        switch (inputIngredient.unit) {
          case ('cl'): unit = 'cL'; break;
          case ('ml'): unit = 'mL'; break;
          default: unit = inputIngredient.unit; break;
        }
        return ({
          name: inputIngredient.label || inputIngredient.ingredient,
          quantity: inputIngredient.amount,
          type: 'Unknown',
          unit,
        }) as OutputIngredient;
      }
    });

    const parsed: OutputDrink = {
      dateCreated: (new Date()).toLocaleDateString(),
      default: true,
      details: {
        category: convertCategory(name),
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
      steps: preparation || 'No instructions given',
    };
    return parsed;
  });
};

const writeOutput = async (outPath: string, drinks: OutputDrink[]) => {
  return new Promise((resolve, reject) => {
    const output = { drinks };
    fs.writeFile(outPath, JSON.stringify(output, null, 2), (err) => {
      err ? reject(err) : resolve();
    });
  });
};

const isSpecialIngredient = (ingredient: any): ingredient is SpecialIngredient => {
  return ingredient.special !== undefined;
};

export { readFile, processDrinkList, writeOutput };
