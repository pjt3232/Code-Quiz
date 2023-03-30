//grabs all of the elements needed
var startButton = document.getElementById("start-game");
var startScreen = document.getElementById("start-screen");
var questionContainer = document.getElementById("question-screen");
var questionText = document.getElementById("question-text");
var choicesList = document.getElementById("choices-list");
var timerDisplay = document.getElementById("time-left");
var submitButton = document.getElementById("submit-button");
var initialsInput = document.getElementById("initials-input");
var highScoresScreen = document.getElementById("high-scores-screen");
var highScoresList = document.getElementById("high-scores-list");
var endScreen = document.getElementById("end-screen");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//starting variables that are needed in multiple functions
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timerId;

//quiz object that has the question, answer, and choices for each of the five questions
var quizQuestions = [
    {
        question: "Which of the following CSS properties is used to control the space between the content and the border of an element?",
        choices: ["border-spacing", "padding", "margin", "content"],
        answer: "padding"
    },
    {
        question: "Which of the following HTML tags is used to define a list inside an unordered list?",
        choices: ["ul", "ol", "li", "dl"],
        answer: "li"
    },
    {
        question: "Which of the following JavaScript functions is used to add an element to the beginning of an array?",
        choices: ["unshift", "push", "shift", "pop"],
        answer: "unshift"
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        choices: ["add", "append", "push", "insert"],
        answer: "push"
    },
    {
        question: "What is the correct HTML tag for creating a hyperlink?",
        choices: ["link", "a", "href", "img"],
        answer: "a"
    }
];

//listens for the click to start the game
startButton.addEventListener("click", startQuiz);

//function hides the opening screen and opens the question screen and runs showQuestion() & startTimer()
function startQuiz() {
    startScreen.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
    startTimer();
}

//displays text content as the current quiz question and appends each choice to the document of the current question
function showQuestion() {
    questionText.textContent = quizQuestions[currentQuestionIndex].question;
    choicesList.innerHTML = ""
    
    for(var i = 0;i <quizQuestions[currentQuestionIndex].choices.length; i++) {
        choice = document.createElement("li");
        choice.textContent = quizQuestions[currentQuestionIndex].choices[i];
        choice.addEventListener("click", checkAnswer);
        choicesList.appendChild(choice);
    }
}

//targets click on any of the choices and checks if the choice is === to the answer. 
//if  not the answer it deducts 10 seconds off the timer and if it is correct updates score by 10 points
function checkAnswer(event) {
    var selectedChoice = event.target.textContent;
    var correctChoice = quizQuestions[currentQuestionIndex].answer;

    if(selectedChoice === correctChoice) {
        score += 10;
    } else {
        timeLeft -= 10;
        if(timeLeft < 0) {
            timeLeft = 0;
        }
        timerDisplay.textContent = timeLeft;
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    } else {
        endQuiz();
    }
}

//sets the time interval of the timer and says to endQuiz() when time is = 0; accounts for 10 second deduction and negative time values
function startTimer() {
    timerId = setInterval(function() {
        timeLeft--;
        if(timeLeft < 0) {
            timeLeft = 0;
            endQuiz();
        }
        timerDisplay.textContent = timeLeft;
    }, 1000);
}

//ends the quiz and clears time interval, also changes the screen content to new section
function endQuiz() {
    clearInterval(timerId);
    questionContainer.classList.add("hide");
    endScreen.classList.remove("hide");
}

//changes screen to new section and makes initials = to input recieved in form
//an object is created for the high score and then sorts them by highest to lowest while only displaying the top 5 scores 
// saves all high scores to local storage
function saveHighScore(event) {
    event.preventDefault();
    endScreen.classList.add("hide");
    highScoresScreen.classList.remove("hide");
    initials = initialsInput.value;

    var newHighScore = {
        initials: initials,
        score: score,
    };
    highScores.push(newHighScore);
    highScores.sort(function(x,y) {
        return y.score - x.score;
    });
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
}

//displays each high score as a list item on the document
function showHighScores() {
    highScoresList.innerHTML = "";
    for(var i = 0;i < highScores.length; i++) {
        var highScore = document.createElement("li");
        highScore.textContent = highScores[i].initials + " : " + highScores[i].score;
        highScoresList.appendChild(highScore);
    }
}

//listens for click on submit button to save high score to local storage
submitButton.addEventListener("click", saveHighScore);


