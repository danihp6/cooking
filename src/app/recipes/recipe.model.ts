import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    public image: string;
    public ingredients: Ingredient[];

    constructor(id: string, name: string, description: string, image: string, ingredients: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
    }
}