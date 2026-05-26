// Code for index.html
// Finds the start button on the first page.
const startButton = document.querySelector("#start");

// This code only runs if the start button exists on the page.
if (startButton !== null) {
    // Runs this code when the player clicks the start button.
    startButton.addEventListener("click", function() {
        // Finds the input where the player writes their name.
        const nameInput = document.querySelector("#name");

        // Gets the name from the input and removes empty spaces.
        const playerName = nameInput.value.trim();

        // Checks if the player did not write a name.
        if (playerName === "") {
            // Shows a message if the name input is empty.
            alert("Please write your name first");
        } else {
            // Saves the player name in the browser.
            localStorage.setItem("currentPlayer", playerName);

            // Saves the starting score in the browser.
            localStorage.setItem("score", 0);

            // Opens the game page in a new tab.
            window.open("html/game.html", "_blank");
        }
    });
}

// Code for game.html
// Game page buttons
// Finds the red button.
const redButton = document.querySelector("#red");

// Finds the blue button.
const blueButton = document.querySelector("#blue");

// Finds the green button.
const greenButton = document.querySelector("#green");

// Finds the yellow button.
const yellowButton = document.querySelector("#yellow");

// This code only runs if the red button exists on the page.
if (redButton !== null) {
    // Finds the start game button.
    const gameStart = document.querySelector("#gameStart");

    // Finds the restart game button.
    const restart = document.querySelector("#restart");

    // Finds the text that shows the score.
    const scoreText = document.querySelector("#score");

    // Puts all the color buttons inside one array.
    const colorButtons = [redButton, blueButton, greenButton, yellowButton];

    // This array stores the pattern the player must remember.
    let pattern = [];

    // This number tells which place in the pattern the player is on.
    let playerPlace = 0;

    // This stores the player's score.
    let score = 0;

    // This decides if the player is allowed to click.
    let canClick = false;

    // This function makes one button flash.
    function flash(button) {
        // Adds the active class so the button lights up.
        button.classList.add("active");

        // Waits a short time before turning the light off.
        setTimeout(function() {
            // Removes the active class so the button goes back to normal.
            button.classList.remove("active");
        }, 500);
    }

    // This function adds one random button to the pattern.
    function addRandomButton() {
        // Makes a random number from 0 to 3.
        const randomNumber = Math.floor(Math.random() * 4);

        // Uses the random number to pick one button from the array.
        const randomButton = colorButtons[randomNumber];

        // Adds the chosen button to the pattern.
        pattern.push(randomButton);
    }

    // This function shows the full pattern to the player.
    function showPattern() {
        // Starts at the first button in the pattern.
        let i = 0;

        // Stops the player from clicking while the pattern is shown.
        canClick = false;

        // Repeats this code every 900 milliseconds.
        const timer = setInterval(function() {
            // Flashes the current button in the pattern.
            flash(pattern[i]);

            // Moves to the next button in the pattern.
            i = i + 1;

            // Checks if the whole pattern has been shown.
            if (i === pattern.length) {
                // Stops the timer.
                clearInterval(timer);

                // Lets the player click again.
                canClick = true;
            }
        }, 900);
    }

    // This function starts the next round.
    function nextRound() {
        // Resets the player back to the first place in the pattern.
        playerPlace = 0;

        // Adds a new random button to the pattern.
        addRandomButton();

        // Shows the pattern to the player.
        showPattern();
    }

    // This function starts the game from the beginning.
    function startGame() {
        // Clears the old pattern.
        pattern = [];

        // Resets the player position.
        playerPlace = 0;

        // Resets the score.
        score = 0;

        // Updates the score text on the page.
        scoreText.textContent = "Score: 0";

        // Starts the first round.
        nextRound();
    }

    // This function runs when the player clicks a color button.
    window.panelClicked = function(clickedTile) {
        // If the player is not allowed to click, stop the function.
        if (canClick === false) {
            return;
        }

        // Checks if the clicked button is not the correct button.
        if (clickedTile !== pattern[playerPlace]) {
            // Stops the player from clicking.
            canClick = false;

            // Shows a game over message.
            alert("Game over");

            // Stops the function.
            return;
        }

        // Moves the player to the next place in the pattern.
        playerPlace = playerPlace + 1;

        // Checks if the player finished the whole pattern correctly.
        if (playerPlace === pattern.length) {
            // Adds one point to the score.
            score = score + 1;

            // Updates the score text on the page.
            scoreText.textContent = "Score: " + score;

            // Stops clicking while the next round is getting ready.
            canClick = false;

            // Waits one second before starting the next round.
            setTimeout(function() {
                // Starts the next round.
                nextRound();
            }, 1000);
        }
    };

    // Starts the game when the start button is clicked.
    gameStart.addEventListener("click", startGame);

    // Restarts the game when the restart button is clicked.
    restart.addEventListener("click", startGame);
}
