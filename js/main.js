// Code for index.html
const startButton = document.querySelector("#start");

if (startButton !== null) {
    startButton.addEventListener("click", function() {
        const nameInput = document.querySelector("#name");
        const playerName = nameInput.value.trim();

        if (playerName === "") {
            alert("Please write your name first");
        } else {
            localStorage.setItem("currentPlayer", playerName);
            localStorage.setItem("score", 0);
            window.open("html/game.html", "_blank");
        }
    });
}

// Code for game.html
// Game page buttons
const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");
const greenButton = document.querySelector("#green");
const yellowButton = document.querySelector("#yellow");

if (redButton !== null) {
    const gameStart = document.querySelector("#gameStart");
    const restart = document.querySelector("#restart");
    const scoreText = document.querySelector("#score");

    const colorButtons = [redButton, blueButton, greenButton, yellowButton];

    let pattern = [];
    let playerPlace = 0;
    let score = 0;
    let canClick = false;

    function flash(button) {
        button.classList.add("active");

        setTimeout(function() {
            button.classList.remove("active");
        }, 500);
    }

    function addRandomButton() {
        const randomNumber = Math.floor(Math.random() * 4);
        const randomButton = colorButtons[randomNumber];
        pattern.push(randomButton);
    }

    function showPattern() {
        let i = 0;
        canClick = false;

        const timer = setInterval(function() {
            flash(pattern[i]);
            i = i + 1;

            if (i === pattern.length) {
                clearInterval(timer);
                canClick = true;
            }
        }, 900);
    }

    function nextRound() {
        playerPlace = 0;
        addRandomButton();
        showPattern();
    }

    function startGame() {
        pattern = [];
        playerPlace = 0;
        score = 0;
        scoreText.textContent = "Score: 0";
        nextRound();
    }

    window.panelClicked = function(clickedTile) {
        if (canClick === false) {
            return;
        }

        if (clickedTile !== pattern[playerPlace]) {
            canClick = false;
            alert("Game over");
            return;
        }

        playerPlace = playerPlace + 1;

        if (playerPlace === pattern.length) {
            score = score + 1;
            scoreText.textContent = "Score: " + score;
            canClick = false;

            setTimeout(function() {
                nextRound();
            }, 1000);
        }
    };

    gameStart.addEventListener("click", startGame);
    restart.addEventListener("click", startGame);
}
