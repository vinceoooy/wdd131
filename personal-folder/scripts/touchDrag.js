export function enableTouchDrag(card, onDropCallback) {
  let offsetX, offsetY;
  let dragging = false;

  card.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;

    card.style.position = "fixed";
    card.style.zIndex = "9999";
    dragging = true;
  });

  card.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    card.style.top = touch.clientY - offsetY + "px";
    card.style.left = touch.clientX - offsetX + "px";

    e.preventDefault(); // Stop scrolling while dragging
  });

  card.addEventListener("touchend", (e) => {
    if (!dragging) return;
    dragging = false;

    card.style.position = "";
    card.style.top = "";
    card.style.left = "";
    card.style.zIndex = "";

    if (typeof onDropCallback === "function") {
      onDropCallback(card);
    }
  });
}
