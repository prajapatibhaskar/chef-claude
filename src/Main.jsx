import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai.js"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )
    const [recipe, setRecipe] = React.useState("")
    const [ingredientInput, setIngredientInput] = React.useState("");

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(event) {
        event.preventDefault(); // Prevent form submission
        setIngredients((prevIngredients) => [...prevIngredients, ingredientInput]);
        setIngredientInput(""); // Clear the input after submission
    }

    return (
      <main>
        <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            value={ingredientInput} // Controlled component
            onChange={(e) => setIngredientInput(e.target.value)} // Update input value on change
          />
          <button>Add ingredient</button>
        </form>

        {ingredients.length > 0 && (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        )}

        {recipe && <ClaudeRecipe recipe={recipe} />}
      </main>
    );
}