import { players, bank } from "./playersData.js";
import { showPayBubble } from "../transaction.js";
import { renderPlayers } from "./playersUI.js";

export function setupBankPay() {
  const bankCard = document.getElementById("bank-card");
  if (!bankCard) return;

  // BANK → PLAYER
  bankCard.addEventListener("dragstart", () => {
    bankCard.classList.add("dragging-bank");
  });

  bankCard.addEventListener("dragend", () => {
    bankCard.classList.remove("dragging-bank");
  });

  document.querySelectorAll(".player-card").forEach(cardEl => {
    cardEl.addEventListener("dragover", (e) => {
      if (!bankCard.classList.contains("dragging-bank")) return;
      e.preventDefault();
      cardEl.classList.add("drop-ready-bank");
    });

    cardEl.addEventListener("dragleave", () => {
      cardEl.classList.remove("drop-ready-bank");
    });

    cardEl.addEventListener("drop", () => {
      if (!bankCard.classList.contains("dragging-bank")) return;

      bankCard.classList.remove("dragging-bank");
      const playerId = Number(cardEl.dataset.id);
      const player = players.find(p => p.id === playerId);

      // Bank pays player
      showPayBubble(null, player, cardEl, (amount) => {
        player.money += amount;
        player.moneyChanged = "increase";
        renderPlayers();
      });

      cardEl.classList.remove("drop-ready-bank");
    });
  });

  // PLAYER → BANK
  bankCard.addEventListener("dragover", (e) => {
    const sourceEl = document.querySelector(".dragging.player-card");
    if (!sourceEl) return;
    e.preventDefault();
    bankCard.classList.add("drop-ready-bank");
  });

  bankCard.addEventListener("dragleave", () => {
    bankCard.classList.remove("drop-ready-bank");
  });

  bankCard.addEventListener("drop", () => {
    const sourceEl = document.querySelector(".dragging.player-card");
    if (!sourceEl) return;

    const playerId = Number(sourceEl.dataset.id);
    const player = players.find(p => p.id === playerId);

    // Player pays bank
    showPayBubble(player, null, bankCard, (amount) => {
      player.money -= amount;
      player.moneyChanged = "decrease";
      renderPlayers();
    });

    bankCard.classList.remove("drop-ready-bank");
  });
}
