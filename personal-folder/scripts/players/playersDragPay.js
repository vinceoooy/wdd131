// playersDragPay.js
import { renderPlayers } from "./playersUI.js";
import { getPlayerById } from "./playersData.js";
import { showPayBubble } from "../transaction.js";

export function setupDragPay(card, player) {
  card.addEventListener("dragstart", () => card.classList.add("dragging"));
  card.addEventListener("dragend", () => card.classList.remove("dragging"));
  card.addEventListener("dragover", e => e.preventDefault());

  card.addEventListener("drop", () => {
    const sourceEl = document.querySelector(".dragging.player-card");
    if (!sourceEl || parseInt(sourceEl.dataset.id) === player.id) return;

    const sourcePlayer = getPlayerById(parseInt(sourceEl.dataset.id));

    showPayBubble(sourcePlayer, player, card, () => {
      sourcePlayer.moneyChanged = "decrease";
      player.moneyChanged = "increase";
      renderPlayers();
    });
  });
}
