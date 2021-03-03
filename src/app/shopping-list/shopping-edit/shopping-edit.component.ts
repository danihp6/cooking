import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') form:NgForm;
  selectedIngredientSub:Subscription;
  selectedIngredient = -1;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.selectedIngredientSub = this.shoppingListService.ingredientSelected.subscribe(
      (index)=>{
        this.selectedIngredient = index;
        let ingredient = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name:ingredient.name,
          amount:ingredient.amount
        });
      }
    );
  }

  ngOnDestroy(){
    this.selectedIngredientSub.unsubscribe();
  }

  onSubmit(){
    if(this.form.valid){
      let ingredient = new Ingredient(this.form.value.name,this.form.value.amount);
      if(this.selectedIngredient > -1){
        this.shoppingListService.updateIngredient(this.selectedIngredient,ingredient)
        this.selectedIngredient = -1;
      } else {
        this.shoppingListService.addIngredient(ingredient);
      }

      this.form.reset();
    }

  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
    this.form.reset();
    this.selectedIngredient = -1;
  }

  onClear(){
    this.form.reset();
    this.selectedIngredient = -1;
  }

}
