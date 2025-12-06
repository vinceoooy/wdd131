// ------- PLAYER DATA -------
let playerCount = 0;
export let players = [];

import { addLog } from "./history.js";
import { showPayBubble } from "./transaction.js";

// ------- CREATE PLAYER -------
export function createPlayer() {
  if (players.length >= 8) {
    addLog("Maximum players reached.");
    return false; 
  }

  playerCount++;
  const player = {
    id: playerCount,
    name: `Player ${playerCount}`,
    money: 1500,
    token: getNextAvailableToken()
  };

  players.push(player);
  renderPlayers();
  addLog("New player added."); 
  return true;
}

const tokenIcons = [
  "thimble.png",
  "wheelbarrow.png",
  "car.png",
  "iron.png",
  "shoe.png",
  "dog.png",
  "top-hat.png",
  "battleship.png"
];

// ------- RENDER PLAYER CARDS -------
export function renderPlayers() {
  const container = document.getElementById("player-container");
  container.innerHTML = "";

  players.forEach((player) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.draggable = true;
    card.dataset.id = player.id;

    // Editable Name
    const nameEl = document.createElement("div");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;
    nameEl.contentEditable = true;

    // Editable Money
    const moneyEl = document.createElement("div");
    moneyEl.className = "player-money";
    moneyEl.textContent = `$${player.money}`;
    if (player.moneyChanged) {
      moneyEl.classList.add("money-update", player.moneyChanged);

      setTimeout(() => {
        moneyEl.classList.remove("money-update", "increase", "decrease");
        player.moneyChanged = null;
      }, 600);
    }

    moneyEl.contentEditable = true;

    card.appendChild(nameEl);
    card.appendChild(moneyEl);
    // Token Image
    const tokenEl = document.createElement("img");
    tokenEl.className = "player-token";
    tokenEl.src = `images/tokens/${player.token}`;
    tokenEl.alt = `${player.name} token`;

    card.appendChild(tokenEl);


    enableEditing(nameEl, moneyEl, player);
    enableDragAndPay(card, player);

    container.appendChild(card);
  });

  // Enable GO drag AFTER cards render
  enableGoPass();
}
function getNextAvailableToken() {
  const usedTokens = players.map(p => p.token);
  return tokenIcons.find(token => !usedTokens.includes(token));
}


// ------- ENABLE EDITING ON PLAYER CARD -------
function enableEditing(nameEl, moneyEl, player) {
  nameEl.addEventListener("blur", () => {
    player.name = nameEl.textContent.trim() || player.name;
    addLog(`${player.name} updated their name`);
  });

  moneyEl.addEventListener("blur", () => {
    const oldMoney = player.money;
    const val = parseInt(moneyEl.textContent.replace(/[^0-9]/g, ""));

    if (!isNaN(val)) {
      player.money = val;

      // Set change direction for animation
      player.moneyChanged = player.money > oldMoney ? "increase" : "decrease";

      addLog(`${player.name}'s money updated: $${player.money}`);
      renderPlayers();
    }
  });


}

// ------- DRAG-TO-PAY BETWEEN PLAYERS -------
function enableDragAndPay(card, player) {
  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  card.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  card.addEventListener("drop", () => {
    const sourceEl = document.querySelector(".dragging.player-card");
    if (!sourceEl) return; // Only works between player cards

    const sourceId = parseInt(sourceEl.dataset.id);
    if (sourceId === player.id) return;

    const sourcePlayer = players.find(p => p.id === sourceId);

    // Show dynamic bubble instead of auto transfer
    showPayBubble(sourcePlayer, player, card, () => {
      sourcePlayer.moneyChanged = "decrease";
      player.moneyChanged = "increase";
      renderPlayers();
    });
  });
}

// ------- DRAG PASS-GO CARD (+$200) -------
function enableGoPass() {
  const goCard = document.getElementById("go-card");
  if (!goCard) return;

  goCard.addEventListener("dragstart", () => {
    goCard.classList.add("dragging");
  });

  goCard.addEventListener("dragend", () => {
    goCard.classList.remove("dragging");
  });

  document.querySelectorAll(".player-card").forEach((cardEl) => {
    cardEl.addEventListener("dragover", (event) => {
      const isGoCard = document.querySelector("#go-card.dragging");
      if (!isGoCard) return;
      event.preventDefault();
      cardEl.classList.add("drop-ready-go");
    });

    cardEl.addEventListener("dragleave", () => {
      cardEl.classList.remove("drop-ready-go");
    });

    cardEl.addEventListener("drop", () => {
      const isGoCard = document.querySelector("#go-card.dragging");
      if (!isGoCard) return;

      const playerId = parseInt(cardEl.dataset.id);
      const player = players.find(p => p.id === playerId);

      player.money += 200;
      player.moneyChanged = "increase";

      addLog(`${player.name} passed GO! +$200`);

      cardEl.classList.remove("drop-ready-go");
      renderPlayers();
    });
  });
}
