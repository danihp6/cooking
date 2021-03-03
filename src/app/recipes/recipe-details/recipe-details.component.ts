import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  subParams: Subscription;
  isLoading = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subParams = this.route.params.subscribe((params: Params) => {
      this.recipeService.getRecipe(params['id']).subscribe((recipe) => {
        this.recipe = recipe;
        this.isLoading = false;
      });
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  goEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  delete() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['../']);
  }
}
