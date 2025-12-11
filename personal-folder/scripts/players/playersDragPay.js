import { players } from "./playersData.js";
import { showPayBubble } from "../transaction.js";
import { renderPlayers } from "./playersUI.js";

export function setupDragPay(card, player) {
  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  card.addEventListener("drop", () => {
    const sourceEl = document.querySelector(".dragging.player-card");
    if (!sourceEl) return;

    const sourceId = Number(sourceEl.dataset.id);
    if (sourceId === player.id) return; // cannot pay yourself

    const sourcePlayer = players.find(p => p.id === sourceId);

    // Show bubble and update money
    showPayBubble(sourcePlayer, player, card, (amount) => {
      sourcePlayer.money -= amount;
      player.money += amount;

      sourcePlayer.moneyChanged = "decrease";
      player.moneyChanged = "increase";

      renderPlayers();
    });
  });
}
