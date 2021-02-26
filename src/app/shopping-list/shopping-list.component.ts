import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients : Ingredient[] = [];
  private isChangeSub:Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.isChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>
      this.ingredients = ingredients
    );
  }

  ngOnDestroy(){
    this.isChangeSub.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  onSelectIngredient(index:number){
    this.shoppingListService.ingredientSelected.next(index);
  }

}
