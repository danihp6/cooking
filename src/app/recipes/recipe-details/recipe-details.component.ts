import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this.RecipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
