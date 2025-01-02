// Retrieve references to DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Sample Questions Data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load previous answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p><strong>${index + 1}. ${
      question.question
    }</strong></p>`;
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[index] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener("change", (e) => {
        userAnswers[index] = e.target.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
      const choiceLabel = document.createElement("label");
      choiceLabel.innerText = choice;
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    });
    questionsElement.appendChild(questionElement);
  });
}

// Calculate and display the final score
function calculateScore() {
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].answer) {
      score++;
    }
  });
  localStorage.setItem("score", score);
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;
  sessionStorage.removeItem("progress"); // Clear progress after submission
}

// Event listener for Submit button
submitButton.addEventListener("click", () => {
  if (userAnswers.length !== questions.length || userAnswers.includes(undefined)) {
    alert("Please answer all questions before submitting!");
    return;
  }
  calculateScore();
});

// Initialize the quiz
renderQuestions();

// Display score from localStorage (if previously saved)
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.innerText = `Last score: ${savedScore} out of ${questions.length}.`;
}
