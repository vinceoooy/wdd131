// playersDragGo.js
import { players } from "./playersData.js";
import { getPlayerById } from "./playersData.js";
import { renderPlayers } from "./playersUI.js";
import { addLog } from "../history.js";

export function setupGoPass() {
  const goCard = document.getElementById("go-card");
  if (!goCard) return;

  goCard.addEventListener("dragstart", () => goCard.classList.add("dragging"));
  goCard.addEventListener("dragend", () => goCard.classList.remove("dragging"));

  document.querySelectorAll(".player-card").forEach(cardEl => {
    cardEl.addEventListener("dragover", e => {
      if (!goCard.classList.contains("dragging")) return;
      e.preventDefault();
    });

    cardEl.addEventListener("drop", () => {
      if (!goCard.classList.contains("dragging")) return;
      const player = getPlayerById(parseInt(cardEl.dataset.id));
      player.money += 200;
      player.moneyChanged = "increase";
      addLog(`${player.name} passed GO! +$200`);
      renderPlayers();
    });
  });
}
