export interface InputDrink {
  name: string;
  glass: string;
  category?: string;
  ingredients: Array<FullIngredient | SpecialIngredient >;
  garnish?: string;
  preparation: string;
}

export interface FullIngredient {
  unit: string;
  amount: number;
  ingredient: string;
  label ?: string; // for things like syrups, ingredient is "Syrup" and label is something like "Grenadine"
}

export interface SpecialIngredient {
  special: string;
}