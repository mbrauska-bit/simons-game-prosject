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
//Game page buttons
const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");
const greenButton = document.querySelector("#green");
const yellowButton = document.querySelector("#yellow");

if (redButton !== null) {
    //Elements
    const gameStart = document.querySelector("#gameStart");
    const restart = document.querySelector("#restart");
    const scoreText = document.querySelector("#score");

    //A list with four colors. Array
    const colorButtons = [redButton, blueButton, greenButton, yellowButton];

    //Varriables
    let pattern = [];
    let playerTurn = 0;
    let score = 0;
    let canClick = false;

    // Choose a random color
    function getRandomColor()//Creates a function that chooses a random color
     {
        const randomNumber = Math.floor(Math.random() * 4);//Makes a random number 0,1,2,3. We have 4 color buttons
        return colorButtons[randomNumber];//reurns one button from our array
    }

    function wait(ms) {
        return new Promise(function(done) {
            setTimeout(done, ms);
        });
    }

  async function flash(button){
    button.classList.add("active");
    await wait(500); //Waits 0.5 sek
    button.classList.remove("active")
  }

    window.panelClicked = function(clickedTile) {
        if (canClick === true) {
            const rightTile = pattern[playerTurn]; 

         //Player clicked the correct color
            if (clickedTile === rightTile)//Only lets the player click if canClick is true.
                 {
                playerTurn = playerTurn + 1;//Moves the player to the next step in the pattern.
                //So if the player just clicked step 0, now they are on the step 1.

                if (playerTurn === pattern.length)//Checks if the player has finished the whole pattern correctly
                     {
                    score = score + 1;// Add one points to the score
                    scoreText.textContent = "Score: " + score;// Updates the text on the page
                    canClick = false;// Stops the player from clicking while the next round is being prepared
                    setTimeout(nextRound, 1000);
                }
                // Player clicked the wrong color
            }
            
            else {
                canClick = false;// Stops the player from clicking anymore after losing
                alert("Game over");// Shows a popup saying Game over!
            }
        } 
    };

    async function nextRound() // async means the function can use await inside it
    {
        canClick = false;// Stops the player from clicking anymore after losing
        playerTurn = 0;// Resets the player postion back to the start of the pattern
        //For example, if the pattern has 4 colors, the player must start by clicking the first one again
        pattern.push(getRandomColor());

        for (let i = 0; i < pattern.length; i = i + 1)// Starts a loop that goes trought eevry color in the pattern
             {
            const button = pattern[i];
            await flash(button);// flashes the button
            await wait(600); // This waits 600 milliseknds=0.6 sek
        }

        canClick = true;// Allow the player to click after the pattern is shown
    }

    function startGame() {
        pattern = [];
        playerTurn = 0;// Resets the player back to the first click
        score = 0;// Resets the score to 0
        canClick = false;// The player cannot click yet beacause the computer needs to show the pattern first
        scoreText.textContent = "Score: 0";// Changes the text of the score
        nextRound();
    }
    //Without these lines , the Start and the Restart buttons will not fo anything
    gameStart.addEventListener("click", startGame);
    restart.addEventListener("click", startGame);
}
