import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable()
export class ShoppingListService {

  ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('spam', 12),
    new Ingredient('apple', 3)
  ];

  getShoppingList() {
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice())
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient)
    this.ingredientAdded.next(this.ingredients.slice())
  }

  updateIngredients(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice())
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  deleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice())
  }
}
