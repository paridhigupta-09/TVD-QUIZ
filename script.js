if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// all my quiz questions are stored here
const questions = [
  {
    question: "Who turns Stefan and Damon into vampires?",
    options: ["Katherine Pierce", "Rose", "Lexi", "Elena"],
    answer: 0
  },
  {
    question: "What is the name of the town where the show is set?",
    options: ["Forks", "Mystic Falls", "Bon Temps", "Charming"],
    answer: 1
  },
  {
    question: "Which flower is used to weaken and control vampires?",
    options: ["Wolfsbane", "Belladonna", "Vervain", "Nightshade"],
    answer: 2
  },
  {
    question: "What is Elena's original last name before finding out she's adopted?",
    options: ["Gilbert", "Salvatore", "Fell", "Forbes"],
    answer: 0
  },
  {
    question: "Who is the original hybrid?",
    options: ["Elijah", "Kol", "Klaus", "Finn"],
    answer: 2
  },
  {
    question: "What supernatural creature is Caroline turned into first?",
    options: ["Witch", "Vampire", "Werewolf", "Hybrid"],
    answer: 1
  },
  {
    question: "Who is Bonnie Bennett by supernatural nature?",
    options: ["Vampire", "Witch", "Werewolf", "Human"],
    answer: 1
  },
  {
    question: "What is the name of the Salvatore brothers' family home?",
    options: ["The Boarding House", "The Lockwood Mansion", "The Gilbert House", "Whitmore Manor"],
    answer: 0
  }
];

// this stores what user picks, index se match hoga questions array ke sath
let userAnswers = new Array(questions.length).fill(null);

const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const resultSummary = document.getElementById("resultSummary");

// ye sabhi questions ek sath page pe daal deta hai, google form jaisa
function loadAllQuestions() {
  let html = "";

  questions.forEach((q, qIndex) => {
    html += `<div class="question-block" data-qindex="${qIndex}">`;
    html += `<h2>${qIndex + 1}. ${q.question}</h2>`;

    q.options.forEach((option, oIndex) => {
      html += `<button type="button" class="option" data-qindex="${qIndex}" data-oindex="${oIndex}">${option}</button>`;
    });

    html += `</div>`;
  });

  quizForm.innerHTML = html;

  // click event har option button pe lagana hai
  document.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => selectOption(btn));
  });
}

function selectOption(btn) {
  const qIndex = parseInt(btn.getAttribute("data-qindex"));
  const oIndex = parseInt(btn.getAttribute("data-oindex"));

  // usi question ke andar sabse selected class hata do
  const questionBlock = document.querySelector(`.question-block[data-qindex="${qIndex}"]`);
  questionBlock.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));

  btn.classList.add("selected");
  userAnswers[qIndex] = oIndex;
}

// jab submit dabaye
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, qIndex) => {
    const questionBlock = document.querySelector(`.question-block[data-qindex="${qIndex}"]`);
    const optionButtons = questionBlock.querySelectorAll(".option");

    optionButtons.forEach((btn) => {
      const oIndex = parseInt(btn.getAttribute("data-oindex"));

      if (oIndex === q.answer) {
        btn.classList.add("correct"); // sahi answer hamesha green
      } else if (oIndex === userAnswers[qIndex]) {
        btn.classList.add("incorrect"); // jo galat pick kiya wo red
      }

      // ab option click karke change nahi ho sakta submit ke baad
      btn.disabled = true;
    });

    if (userAnswers[qIndex] === q.answer) {
      score++;
    }
  });

  resultSummary.textContent = `You scored ${score} out of ${questions.length}`;
  submitBtn.disabled = true;
});

// page load hote hi saare questions daal do
loadAllQuestions();