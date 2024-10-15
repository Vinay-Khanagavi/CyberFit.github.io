// create quiz questions//
const questions = [
    {
        question: "What is phishing?",
        answers: {
            a: "A type of malware",
            b: "An attempt to obtain sensitive information",
            c: "A network attack",
            d: "A cybersecurity framework",
        },
        correct: "b",
        explanation: "Phishing is a method used by attackers to obtain sensitive information by pretending to be a trustworthy entity.",
        topic: "Phishing"
    },
    // Add more questions here
];

// initialize variable for state of quiz//
let currentQuestionIndex = 0;
let score = 0;

// necessary DOM elements//
const quizContainer = document.getElementById("quiz");

// display current question//
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionHtml = `
        <div>
            <h2>${currentQuestion.question}</h2>
            ${Object.keys(currentQuestion.answers).map(answer => `
                <label>
                    <input type="radio" name="answer" value="${answer}">
                    ${currentQuestion.answers[answer]}
                </label>
            `).join('')}
        </div>
    `;
    quizContainer.innerHTML = questionHtml;
}

// handle submission of answers and also navigation of the questions //
document.getElementById("submit").addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            quizContainer.innerHTML = `<h2>Your score: ${score}</h2>`;
            updateLeaderboard("User"); // Replace "User" with a username or identifier
            displayResources();
        }
    } else {
        alert("Please select an answer!");
    }
});

// additional learning resources//
function displayResources() {
    const resources = [
        { topic: 'Phishing', link: 'link_to_phishing_resource' },
        // Add more resources here
    ];
    const resourceHtml = resources.map(resource => `
        <p><a href="${resource.link}" target="_blank">${resource.topic}</a></p>
    `).join('');
    document.getElementById("score").innerHTML += `<div><h3>Learn more:</h3>${resourceHtml}</div>`;
}

// Function to update leaderboard//
function updateLeaderboard(user) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    leaderboard[user] = score;
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    // Display the leaderboard here if desired
}

// Start the quiz//
displayQuestion();
