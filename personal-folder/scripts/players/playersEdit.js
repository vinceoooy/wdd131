// playersEdit.js
import { addLog } from "../history.js";
import { renderPlayers } from "./playersUI.js";

export function setupEditing(nameEl, moneyEl, player) {
  nameEl.addEventListener("blur", () => {
    player.name = nameEl.textContent.trim() || player.name;
    addLog(`${player.name} updated their name`);
  });

  moneyEl.addEventListener("blur", () => {
    const oldMoney = player.money;
    const val = parseInt(moneyEl.textContent.replace(/[^0-9]/g, ""));

    if (!isNaN(val)) {
      player.money = val;
      player.moneyChanged = player.money > oldMoney ? "increase" : "decrease";
      addLog(`${player.name}'s money updated: $${player.money}`);
      renderPlayers();
    }
  });
}
