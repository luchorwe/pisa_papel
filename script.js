const options = {
    "rock": "Piedra",
    "paper": "Papel",
    "scissors": "Tijera"
};
let previousMove = null;

document.getElementById("rock").addEventListener("click", () => play("rock"));
document.getElementById("paper").addEventListener("click", () => play("paper"));
document.getElementById("scissors").addEventListener("click", () => play("scissors"));

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("result").innerText = "";
    document.getElementById("popup").style.display = "none";
    previousMove = localStorage.getItem("previousMove");
});

function play(userChoice) {
    const computerChoice = predictNextMove();
    const result = getResult(userChoice, computerChoice);
    const reason = getReason(userChoice, computerChoice);

    // Mostrar el mensaje emergente con emoji y razón del resultado
    let emoji;
    if (result === "¡Empate!") {
        emoji = "😐";
    } else if (result === "¡Ganaste!") {
        emoji = "🎉";
    } else {
        emoji = "😢";
    }
    const userEmoji = getUserEmoji(userChoice);
    const computerEmoji = getUserEmoji(computerChoice);
    document.getElementById("popup-message").innerText = `Tu elección: ${options[userChoice]} ${userEmoji}\nLa PC elige: ${options[computerChoice]} ${computerEmoji}\n${result} ${emoji}\n${reason}`;
    document.getElementById("popup").style.display = "block";
}

function getUserEmoji(choice) {
    if (choice === "rock") {
        return "👊";
    } else if (choice === "paper") {
        return "🖐️";
    } else {
        return "✂️";
    }
}

function predictNextMove() {
    if (previousMove === null) {
        return Object.keys(options)[Math.floor(Math.random() * Object.keys(options).length)];
    } else {
        // Utilizar el movimiento anterior almacenado
        return previousMove;
    }
}


function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "¡Empate!";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        return "¡Ganaste!";
    } else {
        return "¡Perdiste!";
    }
}

function getReason(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "Ambos eligieron lo mismo.";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        return `Tu ${options[userChoice]} vence a ${options[computerChoice]}.`;
    } else {
        return `La IA logra vencer tu ${options[userChoice]}.`;
    }
}

// Función para alternar la reproducción del audio al hacer clic en el botón
function toggleAudio() {
    var audio = document.getElementById("background-music");
    var audioIcon = document.getElementById("audio-icon");

    if (audio.paused) {
        audio.play(); // Reproducir el audio
        audioIcon.src = "on.png"; // Cambiar la imagen del icono a 'on.png'
    } else {
        audio.pause(); // Pausar el audio
        audioIcon.src = "off.png"; // Cambiar la imagen del icono a 'off.png'
    }
}
