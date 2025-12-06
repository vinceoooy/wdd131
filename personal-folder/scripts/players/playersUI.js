// scripts/players/playersUI.js
import { createPlayerData, players, removePlayerData } from "./playersData.js";
import { setupEditing } from "./playersEdit.js";
import { setupDragPay } from "./playersDragPay.js";
import { setupGoPass } from "./playersDragGo.js";
import { setupBankPay } from "./playersDragBank.js";
import { addLog } from "../history.js";

export function createPlayer(selectedToken = null) {
  const player = createPlayerData(selectedToken);
  if (player) renderPlayers();
}

export function renderPlayers() {
  const container = document.getElementById("player-container");
  container.innerHTML = "";

  players.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.dataset.id = player.id;
    card.draggable = true;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-player-btn";
    removeBtn.textContent = "❌ ";
    removeBtn.title = "Remove Player";

    removeBtn.addEventListener("click", () => {
      removePlayerData(player.id);
      addLog(`${player.name} removed`);
      renderPlayers();
    });

    // Player name
    const nameEl = document.createElement("div");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;
    nameEl.contentEditable = true;

    // Player money
    const moneyEl = document.createElement("div");
    moneyEl.className = "player-money";
    moneyEl.textContent = `$${player.money}`;
    moneyEl.contentEditable = true;

    // 💥 Money animation
    if (player.moneyChanged) {
      moneyEl.classList.add("money-update", player.moneyChanged);
      setTimeout(() => {
        moneyEl.classList.remove("money-update", "increase", "decrease");
        player.moneyChanged = null;
      }, 600);
    }

    // Token image
    const tokenEl = document.createElement("img");
    tokenEl.className = "player-token";
    const safeToken = player.token ?? "thimble.png";
    tokenEl.src = `images/tokens/${safeToken}`;
    tokenEl.alt = `${player.name} token`;
    tokenEl.onerror = () => {
      tokenEl.src = "images/tokens/thimble.png";
    };

    // Build card UI
    card.append(removeBtn, nameEl, moneyEl, tokenEl);

    setupEditing(nameEl, moneyEl, player);
    setupDragPay(card, player);

    container.appendChild(card);
  });

  setupGoPass();
  setupBankPay();
}
