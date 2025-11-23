// Global recipe cache
const recipeBook = [];

// Load recipes on page load
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const recipes = (await import("./recipes.mjs")).default;
        recipeBook.push(...recipes);
        initialRandomRecipe(recipes);
    })();

    const searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = document.getElementById("search").value.toLowerCase();
        filterRecipes(query);
    });
});

// RANDOM NUMBER
function randNum(n) {
    return Math.floor(Math.random() * n);
}

// TEMPLATE — FINAL WORKING VERSION
function recipeTemplate(recipe) {
    return `
      <div class="recipe-top">
          <img id="recipimg" src="${recipe.image}" alt="${recipe.name}">

          <div class="recipe-content">
              <span class="recipe-label">${recipe.tags[0]}</span>

              <h1>${recipe.name}</h1>

              <span class="rating">
                  ${"⭐".repeat(Math.floor(recipe.rating))}
                  ${recipe.rating % 1 ? "⯨" : ""}
                  ${"☆".repeat(5 - Math.ceil(recipe.rating))}
              </span>

              <p class="recipe-description">${recipe.description}</p>
          </div>
      </div>

      <div class="recipe-details" style="display:none;">
          <div class="details-top">
              ${recipe.prepTime ? `Prep: ${recipe.prepTime}` : ""}
              ${recipe.cookTime ? ` | Cook: ${recipe.cookTime}` : ""}
              ${recipe.recipeYield ? ` | Yield: ${recipe.recipeYield}` : ""}
          </div>

          <div class="ingredients-section">
              ${
                recipe.recipeIngredient?.length
                  ? `<p>Ingredients:</p><ul>${recipe.recipeIngredient
                        .map((i) => `<li>${i}</li>`)
                        .join("")}</ul>`
                  : ""
              }

              ${
                recipe.recipeInstructions?.length
                  ? `<p>Instructions:</p><ol>${recipe.recipeInstructions
                        .map((s) => `<li>${s}</li>`)
                        .join("")}</ol>`
                  : ""
              }
          </div>
      </div>
    `;
}

// Populate recipe on page
function populateRecipes(recipes) {
    const container = document.getElementById("recipe");
    container.innerHTML = recipeTemplate(recipes[0]);

    // Enable expand/collapse
    container.addEventListener("click", () => {
        const details = container.querySelector(".recipe-details");
        details.style.display = details.style.display === "none" ? "block" : "none";
    });
}

// Random recipe on load
function initialRandomRecipe(recipes) {
    const randomRecipe = recipes[randNum(recipes.length)];
    populateRecipes([randomRecipe]);
}

// FILTER RECIPES
function filterRecipes(query) {
    if (recipeBook.length === 0) return;

    const filtered = recipeBook.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.join(" ").toLowerCase().includes(query) ||
            recipe.recipeIngredient?.join(" ").toLowerCase().includes(query)
        );
    });

    if (filtered.length > 0) {
        populateRecipes([filtered[0]]);
    }
}
