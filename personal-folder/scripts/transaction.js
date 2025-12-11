// transaction.js
import { addLog } from "./history.js";

const bubble = document.getElementById("pay-bubble");
const input = document.getElementById("bubble-input");
const confirmBtn = document.getElementById("bubble-confirm");

let payer = null;
let receiver = null;
let callback = null;

// Show the bubble
export function showPayBubble(source, target, targetCard, cb) {
  payer = source;
  receiver = target;
  callback = cb;

  // Position bubble under the dragged item
  const rect = targetCard.getBoundingClientRect();
  bubble.style.top = `${rect.top - 45}px`;
  bubble.style.left = `${rect.left + rect.width / 2 - 60}px`;

  input.value = "";
  bubble.classList.remove("hidden");
  input.focus();
}

// CONFIRM FUNCTION (shared by click + Enter)
function confirmPayment() {
  const amount = parseInt(input.value);

  if (!amount || amount <= 0) return;

  // Logging text
  if (payer && receiver) {
    addLog(`${payer.name} paid $${amount} to ${receiver.name}`);
  } else if (payer && receiver === null) {
    addLog(`${payer.name} paid the Bank $${amount}`);
  } else if (payer === null && receiver) {
    addLog(`Bank paid $${amount} to ${receiver.name}`);
  }

  bubble.classList.add("hidden");

  if (typeof callback === "function") {
    callback(amount);

    // 🟢 After callback updates money, save updated players to localStorage
    import("./players/playersData.js").then(module => {
        const { savePlayers } = module;
        savePlayers();
    });
}

}

// CLICK confirm
confirmBtn.addEventListener("click", confirmPayment);

// PRESS ENTER to confirm
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    confirmPayment();
  }
});

// CLICK OUTSIDE to close bubble
document.addEventListener("click", (e) => {
  if (!bubble.contains(e.target) && !bubble.classList.contains("hidden")) {
    bubble.classList.add("hidden");
  }
});
