import { createPlayer, renderPlayers } from "./players/playersUI.js";
import { addLog } from "./history.js";
import { rollDice } from "./dice.js";
import "./transaction.js";

const addPlayerBtn = document.getElementById("add-player-btn");
const diceArea = document.getElementById("dice-area");

// === Token Modal Elements ===
const tokenModal = document.getElementById("token-modal");
const tokenOptions = document.getElementById("token-options");
const tokenClose = document.getElementById("token-close");

// Load players instantly
renderPlayers();                  
addLog("Game Ready! Add players to begin.");

addPlayerBtn.addEventListener("click", () => {
  tokenModal.classList.remove("hidden");
});

// Token selected
tokenOptions.addEventListener("click", (e) => {
  if (!e.target.matches(".token-choice")) return;

  const token = e.target.dataset.token;
  createPlayer(token);
  addLog(`Player joined using token: ${token}`);

  tokenModal.classList.add("hidden");
});

// Close modal
tokenClose.addEventListener("click", () => {
  tokenModal.classList.add("hidden");
});

// Dice roll
diceArea.addEventListener("click", () => {
  const result = rollDice();
  addLog(`Dice rolled: ${result[0]} + ${result[1]}`);
});

// ===== Info Modal =====
const infoBtn = document.getElementById("info-btn");
const infoModal = document.getElementById("info-modal");
const closeModalBtn = document.querySelector(".close-modal");

// Open modal
infoBtn.addEventListener("click", () => {
  infoModal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});

// Click outside = close
infoModal.addEventListener("click", (e) => {
  if (e.target === infoModal) infoModal.classList.add("hidden");
});


