// ✅ Ensure DOM is fully loaded before running any script
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Retrieve saved progress from sessionStorage or initialize an empty object
  const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

  // ✅ Retrieve DOM elements
  const questionsElement = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreElement = document.getElementById("score");

  // ✅ Save user's selected answer to sessionStorage
  function saveAnswer(questionIndex, choice) {
    userAnswers[questionIndex] = choice; // Save the selected answer
    sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Persist to sessionStorage
  }

  // ✅ Handle quiz submission
  submitButton.addEventListener("click", () => {
    let score = 0;

    // Calculate score by comparing answers
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score++;
      }
    }

    // Display score on the screen
    scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

    // Save score to localStorage
    localStorage.setItem("score", score);

    // Clear sessionStorage after submission
    sessionStorage.removeItem("progress");
  });

  // ✅ Display last saved score from localStorage
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your last score was ${savedScore} out of ${questions.length}.`;
  }

  // ✅ Dynamically handle radio button selection to save progress
  document.addEventListener("change", (event) => {
    if (event.target.type === "radio") {
      const [_, questionIndex] = event.target.name.split('-');
      saveAnswer(questionIndex, event.target.value);
    }
  });
});

// Do not change code below this line
// This code will just display the questions to the screen
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

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = questions[i].choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // ✅ Restore checked state dynamically
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();
