let playerCount = 0;
let players = [];

export function createPlayer() {
  playerCount++;
  const player = {
    id: playerCount,
    name: `Player ${playerCount}`,
    money: 1500
  };

  players.push(player);

  renderPlayers();
}

export function renderPlayers() {
  const container = document.getElementById("player-container");
  container.innerHTML = "";

  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.draggable = true;
    card.dataset.id = player.id;

    // Player name (editable)
    const nameEl = document.createElement("div");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;
    nameEl.contentEditable = true;

    // Player money (editable)
    const moneyEl = document.createElement("div");
    moneyEl.className = "player-money";
    moneyEl.textContent = `$${player.money}`;
    moneyEl.contentEditable = true;

    // Append to card
    card.appendChild(nameEl);
    card.appendChild(moneyEl);

    // Enable interactions
    enableDragAndPay(card, player);
    enableEditing(nameEl, moneyEl, player);

    container.appendChild(card);
  });
}

import { addLog } from "./history.js";

function enableEditing(nameEl, moneyEl, player) {
  nameEl.addEventListener("blur", () => {
    player.name = nameEl.textContent.trim() || player.name;
    addLog(`${player.name} updated their name`);
  });

  moneyEl.addEventListener("blur", () => {
    const val = parseInt(moneyEl.textContent.replace(/[^0-9]/g, ""));
    if (!isNaN(val)) {
      player.money = val;
      moneyEl.textContent = `$${player.money}`;
      addLog(`${player.name}'s money updated: $${player.money}`);
    }
  });
}

function enableDragAndPay(card, player) {
  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
    card.dataset.dragSource = player.id;
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  card.addEventListener("dragover", (event) => {
    event.preventDefault();
    card.classList.add("drop-ready");
  });

  card.addEventListener("dragleave", () => {
    card.classList.remove("drop-ready");
  });

  card.addEventListener("drop", () => {
    const sourceId = parseInt(document.querySelector(".dragging")?.dataset.id);
    if (!sourceId || sourceId === player.id) return;

    const sourcePlayer = players.find(p => p.id === sourceId);

    // 💸 Transfer money
    const amount = 50; // For now, automatic $50 transfer
    sourcePlayer.money -= amount;
    player.money += amount;

    addLog(`${sourcePlayer.name} paid $${amount} to ${player.name}`);

    renderPlayers();
  });
}
