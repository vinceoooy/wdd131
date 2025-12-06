export function rollDice() {
  const d1 = Math.ceil(Math.random() * 6);
  const d2 = Math.ceil(Math.random() * 6);

  // Update dice images
  document.getElementById("dice1").src = `images/dice${d1}.png`;
  document.getElementById("dice2").src = `images/dice${d2}.png`;

  // Animate!
  document.getElementById("dice1").classList.add("roll");
  document.getElementById("dice2").classList.add("roll");

  // Remove animation reset
  setTimeout(() => {
    document.getElementById("dice1").classList.remove("roll");
    document.getElementById("dice2").classList.remove("roll");
  }, 500);

  return [d1, d2];
}
