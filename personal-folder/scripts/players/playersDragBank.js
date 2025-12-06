// playersDragBank.js
import { bank, getPlayerById } from "./playersData.js";
import { renderPlayers } from "./playersUI.js";
import { showPayBubble } from "../transaction.js";

export function setupBankPay() {
  const bankCard = document.getElementById("bank-card");
  if (!bankCard) return;

  // --- Bank card drag start / end ---
  bankCard.addEventListener("dragstart", () => {
    bankCard.classList.add("dragging-bank");
  });

  bankCard.addEventListener("dragend", () => {
    bankCard.classList.remove("dragging-bank");
  });

  // --- Bank pays Player ---
  document.querySelectorAll(".player-card").forEach(cardEl => {
    cardEl.addEventListener("dragover", (e) => {
      if (!bankCard.classList.contains("dragging-bank")) return;
      e.preventDefault();
    });

    cardEl.addEventListener("drop", () => {
      if (!bankCard.classList.contains("dragging-bank")) return;
      const playerId = +cardEl.dataset.id;
      const player = getPlayerById(playerId);

      showPayBubble(bank, player, cardEl, () => {
        player.moneyChanged = "increase";
        renderPlayers();
      });
    });
  });

  // --- Player pays Bank ---
  document.querySelectorAll(".player-card").forEach(cardEl => {
    cardEl.addEventListener("dragstart", () => cardEl.classList.add("dragging-player"));
    cardEl.addEventListener("dragend", () => cardEl.classList.remove("dragging-player"));
  });

  bankCard.addEventListener("dragover", (e) => {
    if (!document.querySelector(".dragging-player")) return;
    e.preventDefault();
  });

  bankCard.addEventListener("drop", () => {
    const playerEl = document.querySelector(".dragging-player");
    if (!playerEl) return;

    const playerId = +playerEl.dataset.id;
    const player = getPlayerById(playerId);

    showPayBubble(player, bank, bankCard, () => {
      player.moneyChanged = "decrease";
      renderPlayers();
    });
  });
}
