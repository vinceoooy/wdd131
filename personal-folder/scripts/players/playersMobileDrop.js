import { players } from "./playersData.js";
import { showPayBubble } from "../transaction.js";
import { bank } from "./playersData.js";

export function setupTouchDropCheck(player, card) {
  const elements = document.elementsFromPoint(
    card.getBoundingClientRect().x + card.offsetWidth / 2,
    card.getBoundingClientRect().y + card.offsetHeight / 2
  );

  // Player → Player payment
  const targetPlayerCard = elements.find(el => el.classList.contains("player-card"));
  if (targetPlayerCard && Number(targetPlayerCard.dataset.id) !== player.id) {
    const receiver = players.find(p => p.id == targetPlayerCard.dataset.id);
    showPayBubble(player, receiver, targetPlayerCard);
    return;
  }

  // Player → GO card
  const goCard = elements.find(el => el.id === "go-card");
  if (goCard) {
    player.moneyChanged = "increase";
    player.money += 200;
    showPayBubble(null, null, goCard, () => location.reload());
    return;
  }

  // Player → Bank
  const bankCard = elements.find(el => el.id === "bank-card");
  if (bankCard) {
    showPayBubble(player, bank, bankCard);
    return;
  }
}
