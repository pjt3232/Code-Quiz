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

var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;
var timerId;

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

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
    startTimer();
}

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

function endQuiz() {
    clearInterval(timerId);
    questionContainer.classList.add("hide");
    endScreen.classList.remove("hide");
}

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

function showHighScores() {
    highScoresList.innerHTML = "";
    for(var i = 0;i < highScores.length; i++) {
        var highScore = document.createElement("li");
        highScore.textContent = highScores[i].initials + " : " + highScores[i].score;
        highScoresList.appendChild(highScore);
    }
}

submitButton.addEventListener("click", saveHighScore);


