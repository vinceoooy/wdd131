// playersData.js
import { addLog } from "../history.js";

export let players = [];
let playerCount = 0;

export const bank = {
  id: 0,
  name: "Bank",
  money: Infinity,
  token: null,
};

const tokenIcons = [
  "thimble.png",
  "wheelbarrow.png",
  "car.png",
  "iron.png",
  "shoe.png",
  "dog.png",
  "top-hat.png",
  "battleship.png"
];

export function createPlayerData(selectedToken) {
  if (players.length >= 8) {
    addLog("Maximum players reached.");
    return null;
  }

  playerCount++;
  const player = {
    id: playerCount,
    name: `Player ${playerCount}`,
    money: 1500,
    token: selectedToken // 👈 use chosen token
  };

  players.push(player);
  addLog("New player added.");
  return player;
}


export function getPlayerById(id) {
  return players.find(p => p.id === id);
}

function getNextAvailableToken() {
  const usedTokens = players.map(p => p.token);
  return tokenIcons.find(token => !usedTokens.includes(token));
}


export function removePlayerData(id) {
  const index = players.findIndex(p => p.id === id);
  if (index !== -1) {
    players.splice(index, 1);
  }
}
