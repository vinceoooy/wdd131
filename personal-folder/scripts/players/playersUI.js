import { createPlayerData, players, removePlayerData } from "./playersData.js";
import { setupEditing } from "./playersEdit.js";
import { setupDragPay } from "./playersDragPay.js";
import { setupGoPass } from "./playersDragGo.js";
import { setupBankPay } from "./playersDragBank.js";
import { enableTouchDrag } from "./touchDrag.js";
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
    removeBtn.textContent = "❌";
    removeBtn.title = "Remove Player";

    removeBtn.addEventListener("click", () => {
      removePlayerData(player.id);
      addLog(`${player.name} removed`);
      renderPlayers();
    });

    // Name
    const nameEl = document.createElement("div");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;
    nameEl.contentEditable = true;

    // Money
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

    // Token
    const tokenEl = document.createElement("img");
    tokenEl.className = "player-token";
    tokenEl.src = `images/tokens/${player.token}`;
    tokenEl.alt = `${player.name} token`;

    card.append(removeBtn, nameEl, moneyEl, tokenEl);

    // Enable desktop + touch drag for PLAYERS
    setupEditing(nameEl, moneyEl, player);
    setupDragPay(card, player);
    enableTouchDrag(card, player);

    container.appendChild(card);
  });

  // Desktop drag for GO + Bank
  setupGoPass();
  setupBankPay();

  // Mobile Drag: enable for GO and BANK
  const goCard = document.getElementById("go-card");
  const bankCard = document.getElementById("bank-card");

  if (goCard) enableTouchDrag(goCard, null);   // GO card drag support
  if (bankCard) enableTouchDrag(bankCard, null); // Bank card drag support
}
