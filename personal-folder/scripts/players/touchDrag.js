import { players, bank, savePlayers } from "./playersData.js";
import { showPayBubble } from "../transaction.js";
import { addLog } from "../history.js";

// Helper – update money text in DOM
function updatePlayerMoneyDOM(player) {
  const cardEl = document.querySelector(`.player-card[data-id="${player.id}"]`);
  if (!cardEl) return;

  const moneyEl = cardEl.querySelector(".player-money");
  if (!moneyEl) return;

  moneyEl.textContent = `$${player.money}`;

  if (player.moneyChanged) {
    moneyEl.classList.add("money-update", player.moneyChanged);
    setTimeout(() => {
      moneyEl.classList.remove("money-update", "increase", "decrease");
    }, 600);
  }
}

// MAIN TOUCH DRAG
export function enableTouchDrag(card, player = null) {
  let clone = null;
  let offsetX = 0;
  let offsetY = 0;

  // NEW — track tap vs drag
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  card.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) return;

    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = false;   // tap unless moved
  });

  card.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];

    const dx = Math.abs(touch.clientX - startX);
    const dy = Math.abs(touch.clientY - startY);

    // Only start dragging if moved more than 10px
    if (!isDragging && (dx > 10 || dy > 10)) {
      isDragging = true;
      e.preventDefault(); //stop scroll only when dragging

      const rect = card.getBoundingClientRect();
      clone = card.cloneNode(true);
      clone.classList.add("floating-drag");
      clone.style.position = "fixed";
      clone.style.left = rect.left + "px";
      clone.style.top = rect.top + "px";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.opacity = "0.9";
      clone.style.zIndex = "9999";
      clone.style.pointerEvents = "none";

      document.body.appendChild(clone);

      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      card.style.visibility = "hidden";
    }

    if (isDragging && clone) {
      e.preventDefault(); //stop scroll only while dragging
      moveClone(touch);
    }
  });

  card.addEventListener("touchend", (e) => {

    // TAP allow editing or delete button to work
    if (!isDragging) return;  // fixes your problem

    // DRAG END
    if (!clone) return;

    const rect = clone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    document.body.removeChild(clone);
    clone = null;
    card.style.visibility = "visible";

    if (player) {
      processPlayerDrop(player, centerX, centerY);
    }

    if (card.id === "go-card") {
      processGoCardDrop(centerX, centerY);
    }

    if (card.id === "bank-card") {
      processBankCardDrop(centerX, centerY);
    }
  });

  function moveClone(touch) {
    clone.style.left = `${touch.clientX - offsetX}px`;
    clone.style.top = `${touch.clientY - offsetY}px`;
  }
}

// PLAYER → PLAYER / GO / BANK
function processPlayerDrop(player, x, y) {
  const elements = document.elementsFromPoint(x, y);

  // Player → Player
  const targetPlayerCard = elements.find(el =>
    el.classList.contains("player-card")
  );

  if (targetPlayerCard && Number(targetPlayerCard.dataset.id) !== player.id) {
    const receiver = players.find(p => p.id == targetPlayerCard.dataset.id);

    showPayBubble(player, receiver, targetPlayerCard, (amount) => {
      player.money -= amount;
      receiver.money += amount;
      player.moneyChanged = "decrease";
      receiver.moneyChanged = "increase";
      savePlayers();
      updatePlayerMoneyDOM(player);
      updatePlayerMoneyDOM(receiver);
    });
    return;
  }

  // Player → GO
  const goCard = elements.find(el => el.id === "go-card");
  if (goCard) {
    player.money += 200;
    player.moneyChanged = "increase";
    addLog(`${player.name} passed GO! +$200`);
    savePlayers();
    updatePlayerMoneyDOM(player);
    return;
  }

  // Player → Bank
  const bankCard = elements.find(el => el.id === "bank-card");
  if (bankCard) {
    showPayBubble(player, bank, bankCard, (amount) => {
      player.money -= amount;
      player.moneyChanged = "decrease";
      addLog(`${player.name} paid Bank $${amount}`);
      savePlayers();
      updatePlayerMoneyDOM(player);
    });
  }
}

// GO-PASS CARD → PLAYER
function processGoCardDrop(x, y) {
  const elements = document.elementsFromPoint(x, y);

  const targetPlayerCard = elements.find(el =>
    el.classList.contains("player-card")
  );
  if (!targetPlayerCard) return;

  const player = players.find(p => p.id == targetPlayerCard.dataset.id);
  if (!player) return;

  player.money += 200;
  player.moneyChanged = "increase";
  addLog(`${player.name} passed GO! +$200`);
  savePlayers();
  updatePlayerMoneyDOM(player);
}

// BANK CARD → PLAYER
function processBankCardDrop(x, y) {
  const elements = document.elementsFromPoint(x, y);

  const targetPlayerCard = elements.find(el =>
    el.classList.contains("player-card")
  );
  if (!targetPlayerCard) return;

  const player = players.find(p => p.id == targetPlayerCard.dataset.id);
  if (!player) return;

  showPayBubble(bank, player, targetPlayerCard, (amount) => {
    player.money += amount;
    player.moneyChanged = "increase";
    addLog(`Bank paid $${amount} to ${player.name}`);
    savePlayers();
    updatePlayerMoneyDOM(player);
  });
}
