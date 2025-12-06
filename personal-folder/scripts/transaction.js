import { addLog } from "./history.js";
const bubble = document.getElementById("pay-bubble");
const input = document.getElementById("bubble-input");
const confirmBtn = document.getElementById("bubble-confirm");

let payer = null;
let receiver = null;
let callback = null;

export function showPayBubble(source, target, targetCard, cb) {
  payer = source;
  receiver = target;
  callback = cb;

  // Position bubble near the target card
  const rect = targetCard.getBoundingClientRect();
  bubble.style.top = `${rect.top - 40}px`;
  bubble.style.left = `${rect.left + rect.width / 2 - 60}px`;

  input.value = null
  bubble.classList.remove("hidden");
  input.focus();
}

// Confirm money transfer
confirmBtn.addEventListener("click", () => {
  const amount = parseInt(input.value);
  if (!amount || amount <= 0) return;

  payer.money -= amount;
  receiver.money += amount;

  addLog(`${payer.name} paid $${amount} to ${receiver.name}`);

  bubble.classList.add("hidden");
  callback();
});

// Clicking outside bubble cancels payment
document.addEventListener("click", (e) => {
  if (!bubble.contains(e.target) && !bubble.classList.contains("hidden")) {
    bubble.classList.add("hidden");
  }
});
