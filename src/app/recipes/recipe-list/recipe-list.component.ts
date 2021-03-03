import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] = [];
  recipesSub:Subscription;
  isLoading = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeService.getRecipes().subscribe(
      (recipes)=> {
        this.recipes = recipes
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe();
  }

}
