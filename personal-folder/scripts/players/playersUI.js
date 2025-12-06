// playersUI.js
import { createPlayerData, players } from "./playersData.js";
import { setupEditing } from "./playersEdit.js";
import { setupDragPay } from "./playersDragPay.js";
import { setupGoPass } from "./playersDragGo.js";
import { setupBankPay } from "./playersDragBank.js";
import { enableTouchDrag } from "../touchDrag.js";
import { setupTouchDropCheck } from "./playersMobileDrop.js";


export function createPlayer() {
  const player = createPlayerData();
  if (player) renderPlayers();
}

export function renderPlayers() {
  const container = document.getElementById("player-container");
  container.innerHTML = "";

  players.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.draggable = true;
    card.dataset.id = player.id;

    const nameEl = document.createElement("div");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;
    nameEl.contentEditable = true;

    const moneyEl = document.createElement("div");
    moneyEl.className = "player-money";
    moneyEl.textContent = `$${player.money}`;
    moneyEl.contentEditable = true;

    if (player.moneyChanged) {
      moneyEl.classList.add("money-update", player.moneyChanged);
      setTimeout(() => {
        moneyEl.classList.remove("money-update", "increase", "decrease");
        player.moneyChanged = null;
      }, 600);
    }

    const tokenEl = document.createElement("img");
    tokenEl.className = "player-token";
    tokenEl.src = `images/tokens/${player.token}`;
    tokenEl.alt = `${player.name} token`;

    card.append(nameEl, moneyEl, tokenEl);

    setupEditing(nameEl, moneyEl, player);
    setupDragPay(card, player);

    // 🔹 enable touch-drag AFTER the card exists
    enableTouchDrag(card);

    container.appendChild(card);
    enableTouchDrag(card, () => setupTouchDropCheck(player, card));
  });

  setupGoPass();
  setupBankPay();
}