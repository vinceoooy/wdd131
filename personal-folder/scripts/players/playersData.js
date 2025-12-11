import { addLog } from "../history.js";

export let players = JSON.parse(localStorage.getItem("players")) || [];
let playerCount = players.length; // continue numbering after refresh

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

export function savePlayers() {
  localStorage.setItem("players", JSON.stringify(players));
}

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
    token: selectedToken || getNextAvailableToken(),
    moneyChanged: null
  };

  players.push(player);
  savePlayers();
  addLog("New player added.");

  return player;
}

export function removePlayerData(id) {
  players = players.filter(p => p.id !== id);
  savePlayers();
}

export function updatePlayer(player) {
  const index = players.findIndex(p => p.id === player.id);
  if (index !== -1) {
    players[index] = player;
    savePlayers();
  }
}

export function getPlayerById(id) {
  return players.find(p => p.id === id);
}

function getNextAvailableToken() {
  const usedTokens = players.map(p => p.token);
  return tokenIcons.find(t => !usedTokens.includes(t));
}
