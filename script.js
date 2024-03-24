const options = {
    "rock": "Piedra",
    "paper": "Papel",
    "scissors": "Tijera"
};

let previousMove = null;

document.getElementById("rock").addEventListener("click", () => {
    showLotteryAnimation("rock");
});

document.getElementById("paper").addEventListener("click", () => {
    showLotteryAnimation("paper");
});

document.getElementById("scissors").addEventListener("click", () => {
    showLotteryAnimation("scissors");
});

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("result").innerText = "";
    document.getElementById("popup").style.display = "none";
    previousMove = localStorage.getItem("previousMove");
});

function showLotteryAnimation(userChoice) {
    document.getElementById("lottery-animation").style.display = "block";
    setTimeout(() => {
        document.getElementById("lottery-animation").style.display = "none";
        play(userChoice); // Mover aquí para que se ejecute después de la animación
    }, 3000);
}

function play(userChoice) {
    const computerChoice = predictNextMove();
    const result = getResult(userChoice, computerChoice);
    const reason = getReason(userChoice, computerChoice);

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

function toggleAudio() {
    var audio = document.getElementById("background-music");
    var button = document.getElementById("audio-image");
    if (audio.paused) {
        audio.play();
        button.src = "on.png";
    } else {
        audio.pause();
        button.src = "off.png";
    }
}
