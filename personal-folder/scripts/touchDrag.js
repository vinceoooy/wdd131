export function enableTouchDrag(card) {
  let offsetX = 0;
  let offsetY = 0;

  card.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;

    card.classList.add("dragging");
    card.style.position = "absolute";
    card.style.zIndex = 999;
  });

  card.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    card.style.left = `${touch.clientX - offsetX}px`;
    card.style.top = `${touch.clientY - offsetY}px`;
  });

  card.addEventListener("touchend", () => {
    card.classList.remove("dragging");
    card.style.position = "";
    card.style.left = "";
    card.style.top = "";
  });
}
