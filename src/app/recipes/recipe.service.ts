import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  private BASE_URL = 'https://cooking-demo-d3857-default-rtdb.firebaseio.com/recipes';

  constructor(private shoppingListService: ShoppingListService,private http:HttpClient) { }

  getRecipes():Observable<Recipe[]> {
    return this.http.get(this.BASE_URL + '.json')
    .pipe(
      map(
        response => {
          const recipes = [];
          for (const key in response) {
              const recipe = response[key];
              recipes.push( {
                    ...recipe,
                    id:key,
                    ingredients:recipe.ingredients?recipe.ingredients:[]
                  })
          }
          return recipes;
        }
      )
    );
  }

  getRecipe(id: string):Observable<Recipe> {
    return this.http.get<any>(this.BASE_URL+'/'+id+'.json')
    .pipe(
      map(
        recipe => {
          return {
            ...recipe,
            id:id,
            ingredients:recipe.ingredients?recipe.ingredients:[]
          };
        }
      )
    )
  }

  async addRecipe(recipe: Recipe):Promise<String> {
    return await this.http.post<String>(this.BASE_URL+'.json',{...recipe})
    .toPromise()
  }

  deleteRecipe(id:string){
    this.http.delete<any>(this.BASE_URL+'/'+id+'.json')
    .toPromise()
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id:string,recipe:Recipe){
    this.http.put(this.BASE_URL+'/'+id+'.json',recipe)
    //this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
