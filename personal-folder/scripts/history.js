export function addLog(message) {
  const ul = document.getElementById("log-list");
  const li = document.createElement("li");
  li.textContent = message;
  ul.prepend(li);
}
