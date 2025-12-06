import { players } from "./playersData.js";
import { addPlayerUI } from "./playersUI.js";

export const tokenIcons = [
  "thimble.png",
  "wheelbarrow.png",
  "car.png",
  "iron.png",
  "shoe.png",
  "dog.png",
  "top-hat.png",
  "battleship.png"
];

const modal = document.getElementById("token-select-modal");
const tokenContainer = document.getElementById("token-options");
const cancelBtn = document.getElementById("cancel-token-select");

export function openTokenSelect(callback) {
  modal.classList.remove("hidden");
  renderTokens(callback);
}

function renderTokens(callback) {
  tokenContainer.innerHTML = "";
  const used = players.map(p => p.token);

  tokenIcons.forEach(token => {
    const img = document.createElement("img");
    img.src = `images/tokens/${token}`;
    img.className = "token-option";
    img.dataset.token = token;

    if (used.includes(token)) {
      img.classList.add("token-disabled");
    } else {
      img.addEventListener("click", () => {
        modal.classList.add("hidden");
        callback(token);
      });
    }

    tokenContainer.appendChild(img);
  });
}

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
