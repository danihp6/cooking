import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:string;
  editMode = false;
  form:FormGroup;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.editMode = params['id'] != null;
        this.id = params['id'];
        this.initForm();
      }
    );
  }

  initForm(){
    let name = '';
    let image = '';
    let description = '';
    let ingredients:Ingredient[] = [];

    if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id);
      
      name = recipe.name;
      image = recipe.image;
      description = recipe.description;
      if(recipe.ingredients){
        for (let ingredient of recipe.ingredients) {
          ingredients.push(ingredient);
        }
      }
    }

    let ingredientControls=new FormArray([]);
    for (let ingredient of ingredients) {
      ingredientControls.push(new FormGroup({
        'name': new FormControl(ingredient.name,Validators.required),
        'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
    }

    this.form = new FormGroup({
      'name': new FormControl(name,Validators.required),
      'image': new FormControl(image,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': ingredientControls
    });
  }

  get ingredientControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onSubmit(){
    console.log('submit');
    const recipe:Recipe = this.form.value;
    
    if(this.editMode){
      recipe.id = this.id;
      this.recipeService.updateRecipe(this.id,recipe);
      this.router.navigate(['../'],{relativeTo:this.route});
    }
     else {
      recipe.id = this.recipeService.generateId();
      this.recipeService.addRecipe(recipe);
      this.router.navigate(['/recipes',recipe.id]);
     }
    
  }

  addIngredient(){
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl('',Validators.required),
        'amount':new FormControl('',[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel(){
    this.router.navigate(['/recipes',this.id]);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
}
