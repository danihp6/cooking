import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      '1234',
      'Tasty Schnitzel',
      'First recipe',
      'https://pngimg.com/uploads/schnitzel/schnitzel_PNG2.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 20)
      ]
    ),
    new Recipe(
      '1235',
      'Big Fat Burger',
      'Second recipe',
      'https://files.elfsight.com/storage/95d9d512-a886-4db3-81c5-431ed5c5dd9d/218823b2-bf79-4b26-a632-f31389fb90d2.jpeg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find((recipe: Recipe) => recipe.id == id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
