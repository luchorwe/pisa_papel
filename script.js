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
    // Muestra la animación de lotería
    showLotteryAnimation();
    
    // Espera 3 segundos antes de mostrar el resultado
    setTimeout(() => {
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
    }, 3000);
}

function showLotteryAnimation(computerChoice) {
    // Oculta las manos de la computadora
    document.getElementById("emojis").style.display = "none";

    // Muestra la mano de la computadora correspondiente a su elección durante la animación de lotería
    const computerEmoji = getUserEmoji(computerChoice);
    document.getElementById("lottery-animation").innerHTML = computerEmoji;

    // Muestra la animación de lotería aquí
    // Puedes agregar tu código para mostrar la animación de lotería
    // Por ejemplo, puedes cambiar la imagen o el estilo del contenedor que muestra la animación de lotería
    // Asegúrate de ocultar la animación después de un tiempo adecuado

    // Simulando una animación con un retraso de 3 segundos
    setTimeout(() => {
        // Muestra las manos de la computadora nuevamente después de la animación
        document.getElementById("emojis").style.display = "block";
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


function animateLoteria() {
    // Obtener referencia al div de emojis
    const emojisDiv = document.getElementById("emojis");
    
    // Definir emojis de lotería
    const loteriaEmojis = ["👊", "✋", "✌️"];

    // Intervalo para cambiar los emojis cada 200 milisegundos
    let interval = setInterval(() => {
        // Escoger un emoji al azar de la lista de lotería
        const randomEmoji = loteriaEmojis[Math.floor(Math.random() * loteriaEmojis.length)];
        // Mostrar el emoji en el div
        emojisDiv.innerText = randomEmoji;
    }, 200);

    // Detener la animación después de 3 segundos
    setTimeout(() => {
        clearInterval(interval);
    }, 3000);
}

function showGif() {
    // Mostrar el GIF
    const gifContainer = document.getElementById("gif-container");
    gifContainer.style.display = "block";
    // Ocultar el GIF después de 3 segundos
    setTimeout(() => {
        gifContainer.style.display = "none";
    }, 3000);
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
