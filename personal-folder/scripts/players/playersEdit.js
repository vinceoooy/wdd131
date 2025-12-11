// playersEdit.js
import { addLog } from "../history.js";
import { renderPlayers } from "./playersUI.js";
import { updatePlayer } from "./playersData.js";

export function setupEditing(nameEl, moneyEl, player) {
  nameEl.addEventListener("blur", () => {
    player.name = nameEl.textContent.trim() || player.name;
    updatePlayer(player);
    addLog(`${player.name} updated their name`);
  });

  moneyEl.addEventListener("blur", () => {
    const oldMoney = player.money;
    const val = parseInt(moneyEl.textContent.replace(/[^0-9]/g, ""));

    if (!isNaN(val)) {
      player.money = val;
      player.moneyChanged = player.money > oldMoney ? "increase" : "decrease";

      updatePlayer(player);
      addLog(`${player.name}'s money updated: $${player.money}`);

      renderPlayers();
    }
  });
}
