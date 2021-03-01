import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private recipeService: RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.recipesSub = this.recipeService.recipesChanged.subscribe(
      (recipes)=>
      this.recipes = recipes
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe();
  }

}
