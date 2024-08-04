const quizData = [
    {
        question: "What is the capital of France?",
        image: "https://example.com/paris.jpg", // Replace with a valid image URL
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        image: "https://example.com/math.jpg", // Replace with a valid image URL
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        image: "https://example.com/mars.jpg", // Replace with a valid image URL
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 30; // seconds
let timeRemaining = timeLimit;

const startQuizButton = document.getElementById('start-quiz');
const quizSection = document.getElementById('quiz-section');
const rulesSection = document.getElementById('rules-section');
const questionElement = document.getElementById('question');
const imageContainer = document.getElementById('image-container');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('time');

startQuizButton.addEventListener('click', () => {
    rulesSection.style.display = 'none';
    quizSection.style.display = 'block';
    startQuiz();
});

function startQuiz() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const data = quizData[currentQuestionIndex];
    questionElement.textContent = data.question;
    imageContainer.innerHTML = `<img src="${data.image}" alt="Question Image">`;
    answersElement.innerHTML = '';
    data.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(index));
        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.style.display = 'none';
    } else {
        endQuiz();
    }
});

function startTimer() {
    timeRemaining = timeLimit;
    timerElement.textContent = timeRemaining;
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = '';
    imageContainer.innerHTML = '';
    answersElement.innerHTML = '';
    nextButton.style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.textContent = `Quiz Over! You scored ${score} out of ${quizData.length}.`;
}
