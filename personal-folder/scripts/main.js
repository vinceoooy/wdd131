import { createPlayer } from "./players.js";
import { addLog } from "./history.js";
import { rollDice } from "./dice.js";

const addPlayerBtn = document.getElementById("add-player-btn");
const diceArea = document.getElementById("dice-area");
const playerContainer = document.getElementById("player-container");

// Start with 2 players
createPlayer();
createPlayer();
addLog("Game Started!");

addPlayerBtn.addEventListener("click", () => {
  createPlayer();
  addLog("New player added.");
});

diceArea.addEventListener("click", () => {
  const result = rollDice();
  addLog(`Dice rolled: ${result[0]} + ${result[1]}`);
});
