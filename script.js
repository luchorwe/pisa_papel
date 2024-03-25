const options = {
    "rock": "Piedra",
    "paper": "Papel",
    "scissors": "Tijera"
};

let playerScore = 0;
let aiScore = 0;

// Función para mostrar los puntos en un pop-up
// Función para mostrar los puntos después de cada ronda
function showScores() {
    const playerScoreElement = document.getElementById('player-score');
    const aiScoreElement = document.getElementById('ai-score');

    // Actualizar el contenido de los elementos HTML con los puntajes
    playerScoreElement.textContent = `Tus puntos: ${playerScore}`;
    aiScoreElement.textContent = `Puntos de la IA: ${aiScore}`;
}


// Función para actualizar los puntos después de cada partida y mostrar un pop-up con los puntos
function updatePoints(result) {
    if (result === "¡Ganaste!") {
        playerScore++;
    } else if (result === "¡Perdiste!") {
        aiScore++;
    } else {
        // En caso de empate, se suma un punto a cada uno
        playerScore++;
        aiScore++;
    }

    showScores();
}

// Función para mostrar un pop-up con un mensaje
function showPopup(message) {
    const popupMessage = document.createElement('div');
    popupMessage.classList.add('popup-message');
    popupMessage.innerText = message;
    document.body.appendChild(popupMessage);

    setTimeout(() => {
        popupMessage.remove();
    }, 2000); // Eliminar el pop-up después de 2 segundos
}

// Función play actualizada para llamar a updatePoints
function play(userChoice) {
    const computerChoice = predictNextMove();
    const result = getResult(userChoice, computerChoice);
    const reason = getReason(userChoice, computerChoice);
    
    // Actualizar los puntos
    updatePoints(result);

    // Resto del código de la función play...
}

document.getElementById("rock").addEventListener("click", () => {
    play("rock");
});

document.getElementById("paper").addEventListener("click", () => {
    play("paper");
});

document.getElementById("scissors").addEventListener("click", () => {
    play("scissors");
});

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("result").innerText = "";
    document.getElementById("popup").style.display = "none";
    localStorage.removeItem("previousMove");
});

function play(userChoice) {
    const computerChoice = predictNextMove();

    // Mostrar la mano de la computadora durante 2 segundos
    showComputerChoice(computerChoice);

    // Esperar 2 segundos antes de mostrar el resultado
    setTimeout(() => {
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
    }, 2000); // Mostrar el resultado después de 2 segundos
}

function showComputerChoice(computerChoice) {
    // Mostrar la mano de la computadora
    const computerEmoji = getUserEmoji(computerChoice);
    document.getElementById("emojis").innerHTML = computerEmoji;

    // Esperar 2 segundos antes de volver a mostrar las tres manos
    setTimeout(() => {
        showAllHands();
    }, 2000);
}

function showAllHands() {
    // Mostrar las tres manos de piedra, papel o tijera
    document.getElementById("emojis").innerHTML = "👊✋✌️";
}

function predictNextMove() {
    return Object.keys(options)[Math.floor(Math.random() * Object.keys(options).length)];
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

function getUserEmoji(choice) {
    switch (choice) {
        case "rock":
            return "👊";
        case "paper":
            return "✋";
        case "scissors":
            return "✌️";
        default:
            return "";
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
