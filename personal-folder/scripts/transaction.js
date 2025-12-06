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

  input.value = "";
  bubble.classList.remove("hidden");
  setTimeout(() => input.focus(), 50); // ensure autofocus
}

// Confirm transaction
function completeTransaction() {
  const amount = parseInt(input.value);

  if (isNaN(amount) || amount <= 0) return; // Prevent bad values

  if (payer && receiver) {
    // Player → Player
    payer.money -= amount;
    receiver.money += amount;
    payer.moneyChanged = "decrease";
    receiver.moneyChanged = "increase";
    addLog(`${payer.name} paid $${amount} to ${receiver.name}`);
    
  } else if (payer && !receiver) {
    // Player → Bank
    payer.money -= amount;
    payer.moneyChanged = "decrease";
    addLog(`${payer.name} paid $${amount} to Bank`);
    
  } else if (!payer && receiver) {
    // Bank → Player
    receiver.money += amount;
    receiver.moneyChanged = "increase";
    addLog(`${receiver.name} received $${amount} from Bank`);
  }

  bubble.classList.add("hidden");
  callback();
}

// Click confirm 
confirmBtn.addEventListener("click", completeTransaction);

// Press Enter to confirm too!
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    completeTransaction();
  }
});

// Clicking outside bubble cancels
document.addEventListener("click", (e) => {
  if (!bubble.contains(e.target) && !bubble.classList.contains("hidden")) {
    bubble.classList.add("hidden");
  }
});
