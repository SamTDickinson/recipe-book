import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  recipeAdded: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[]
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "My First Recipe",
  //     "Simple test recipe",
  //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffamilystylefood.com%2Fwp-content%2Fuploads%2F2020%2F06%2Fmeatballs-1.jpg&f=1&nofb=1&ipt=0fc5b6faa33806a5b0ab374a51f7b4f9d9d7f86dccc63011dbabe91d253cdc01&ipo=images",
  //     [
  //       new Ingredient('meat', 3),
  //       new Ingredient('roll', 1),
  //       new Ingredient('fries', 20)
  //     ]),
  //   new Recipe("My Second Recipe",
  //     "Simple test recipe",
  //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffamilystylefood.com%2Fwp-content%2Fuploads%2F2020%2F06%2Fmeatballs-1.jpg&f=1&nofb=1&ipt=0fc5b6faa33806a5b0ab374a51f7b4f9d9d7f86dccc63011dbabe91d253cdc01&ipo=images",
  //     [
  //       new Ingredient('meatballs', 8),
  //       new Ingredient('pasta', 30)
  //     ])
  // ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipeAdded.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice())
  }
}
