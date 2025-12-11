import { players } from "./players/playersData.js";

const loadBtn = document.getElementById("load-game-btn");
const modal = document.getElementById("load-modal");
const closeBtn = document.getElementById("load-close");
const confirmBtn = document.getElementById("confirm-load-btn");
const input = document.getElementById("load-input");

// -----------------------
// Open & Close Modal
// -----------------------
loadBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

// -----------------------
// Load Game Logic
// -----------------------
confirmBtn.addEventListener("click", () => {
    const code = input.value.trim();

    if (!code) {
        alert("Please paste a save code.");
        return;
    }

    try {
        // Decode Base64 → JSON
        const decoded = atob(code);
        const saveData = JSON.parse(decoded);

        if (!saveData.players || !Array.isArray(saveData.players)) {
            throw new Error("Invalid save data");
        }

        // Store into localStorage
        localStorage.setItem("players", JSON.stringify(saveData.players));

        alert("Game loaded! Redirecting...");

        // Go to the game
        window.location.href = "game.html";

    } catch (err) {
        console.error(err);
        alert("Invalid or corrupted save code.");
    }
});
