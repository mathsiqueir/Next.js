export interface Ingredient {
    name: string;
    grams: string | number;
}

export interface Recipe {
    id: string | number;
    title: string;
    description: string;
    ingredients?: Ingredient[];
}
