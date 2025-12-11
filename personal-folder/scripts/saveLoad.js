import { players } from "./players/playersData.js";

const saveBtn = document.getElementById("save-game-btn");

saveBtn.addEventListener("click", () => {
    if (!players.length) {
        alert("No players to save.");
        return;
    }

    const saveData = {
        players: players.map(p => ({
            id: p.id,
            name: p.name,
            money: p.money,
            token: p.token
        })),
        timestamp: Date.now()
    };

    const encoded = btoa(JSON.stringify(saveData)); // Base64 encode

    navigator.clipboard.writeText(encoded).catch(() => {});

    alert(
        "Game saved! Your save code has been copied.\n\n" +
        "Keep this code safe:\n\n" +
        encoded
    );
});
