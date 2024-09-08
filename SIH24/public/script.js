const quizData = [
  {
    text: "You are a high school student who has been suspended for wearing a shirt that protests a recent school policy. The school claims your shirt disrupts the learning environment, but you believe it’s a form of free speech. What do you do?",
    choices: [
      { text: "Appeal the suspension, claiming your First Amendment right to free speech.", correct: true, feedback: "Correct! Based on *Tinker v. Des Moines (1969)*, students do not shed their constitutional rights at the school gate." },
      { text: "Accept the suspension to avoid further conflict.", correct: false, feedback: "Incorrect. Your First Amendment rights should be defended, especially if the protest was peaceful and non-disruptive." },
      { text: "Organize a peaceful protest outside the school.", correct: true, feedback: "Correct! Organizing a peaceful protest would further strengthen your voice." }
    ]
  },
  {
    text: "Police officers arrive at your apartment and request to search your home, suspecting illegal activity. They don’t have a warrant, but they insist that it’s in your best interest to comply. How do you respond?",
    choices: [
      { text: "Allow the search to show you have nothing to hide.", correct: false, feedback: "Incorrect. Under the Fourth Amendment, you have the right to refuse an unreasonable search unless the officers have a warrant or exigent circumstances." },
      { text: "Refuse the search unless the officers obtain a warrant.", correct: true, feedback: "Correct! Based on *Katz v. United States (1967)*, you are within your rights to refuse a warrantless search." },
      { text: "Record the interaction to ensure your rights are protected.", correct: true, feedback: "Correct! Recording the encounter can help ensure that your rights are respected during the interaction." }
    ]
  },
  {
    text: "You are taken into police custody after being present at the scene of a crime. The officers immediately start questioning you without informing you of your rights. You feel pressured to answer. What do you do?",
    choices: [
      { text: "Refuse to answer any questions until you have a lawyer present.", correct: true, feedback: "Correct! Under *Miranda v. Arizona (1966)*, you have the right to remain silent and request an attorney." },
      { text: "Cooperate fully with the questioning to clear your name.", correct: false, feedback: "Incorrect. Without being read your Miranda rights, anything you say may be used against you, even if you believe you’re innocent." },
      { text: "Try to explain your innocence while avoiding direct answers.", correct: false, feedback: "Incorrect. You should remain silent and wait for a lawyer to protect your rights." }
    ]
  },
  {
    text: "Your employer has introduced a policy requiring all employees to work weekends. You observe Saturday as a day of rest and worship. Your manager refuses to accommodate your religious practice. What do you do?",
    choices: [
      { text: "File a complaint with the EEOC to assert your right to religious accommodation.", correct: true, feedback: "Correct! Under Title VII of the Civil Rights Act, employers must accommodate religious practices unless it causes undue hardship on the business." },
      { text: "Agree to the policy but continue practicing your religion in secret.", correct: false, feedback: "Incorrect. You have the legal right to request accommodation for religious practices rather than hiding your beliefs." },
      { text: "Attempt to negotiate with your employer for an exception.", correct: true, feedback: "Correct! Negotiation is a reasonable first step, but you should be aware of your rights under Title VII if your employer refuses." }
    ]
  },
  {
    text: "You are participating in a peaceful protest against a government policy. Law enforcement orders the crowd to disperse, citing potential violence from counter-protesters. What do you do?",
    choices: [
      { text: "Refuse to leave and continue the peaceful protest.", correct: true, feedback: "Correct! Based on *NAACP v. Claiborne Hardware Co. (1982)*, you have the right to peacefully protest, though any acts of violence can change the situation." },
      { text: "Comply with the order to disperse and end the protest.", correct: false, feedback: "Incorrect. You have a constitutional right to peaceful assembly, and dispersing without cause can undermine this right." },
      { text: "Move the protest to a different location where it might not draw the same attention.", correct: true, feedback: "Correct! Relocating the protest can be a strategic choice if tensions rise, but you retain your right to assembly." }
    ]
  },
  {
    text: "You arrive at your polling place to vote, but the officials require you to present a government-issued ID. You don’t have one, but you are registered to vote. How do you handle this?",
    choices: [
      { text: "Demand to vote without presenting an ID, arguing that the requirement is unconstitutional.", correct: false, feedback: "Incorrect. While voter ID laws are often challenged, they have been upheld in cases like *Crawford v. Marion County Election Board (2008)*." },
      { text: "Leave and return later with the required identification.", correct: true, feedback: "Correct! Bringing the required ID ensures that your vote counts under current legal standards." },
      { text: "File a formal complaint with the state’s election board.", correct: true, feedback: "Correct! Filing a complaint is an option if you believe the voter ID requirement is disenfranchising, though it may not affect the immediate situation." }
    ]
  }
];
  // Additional questions here...


  let currentQuestionIndex = 0;
let score = 0;
let leaderboard = [];

const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const explanationEl = document.getElementById('explanation');
const gifContainer = document.getElementById('gif-container');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const leaderboardContainer = document.getElementById('leaderboard-container');
const leaderboardList = document.getElementById('leaderboard');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
  const username = usernameInput.value;
  if (username) {
    document.getElementById('start-screen').style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
  }
}

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.text;
  optionsContainer.innerHTML = '';
  explanationEl.style.display = 'none';
  gifContainer.style.display = 'none'; // Hide GIF container
  gifContainer.innerHTML = ''; // Clear previous GIF
  nextBtn.style.display = 'none';

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.classList.add('option');
    button.onclick = () => selectAnswer(choice, button);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(choice, button) {
  const correct = choice.correct;
  button.style.backgroundColor = correct ? 'green' : 'red';
  explanationEl.textContent = choice.feedback;
  explanationEl.style.display = 'block';

  // Clear previous GIF and center GIF container
  gifContainer.innerHTML = '';
  gifContainer.style.display = 'flex';
  gifContainer.style.justifyContent = 'center';
  gifContainer.style.alignItems = 'center';

  const gif = document.createElement('img');
  gif.style.border = '2px solid #FFD700'; // Box around GIF
  gif.style.padding = '10px';
  gif.style.marginTop = '20px';

  if (correct) {
    gif.src = 'gifs/shinchan1.gif'; // Correct GIF
    triggerCoinRain();  // Trigger coin rain when correct
  } else {
    gif.src = 'gifs/shinchan.gif'; // Incorrect GIF
  }

  gifContainer.appendChild(gif);

  if (correct) score++;
  scoreDisplay.textContent = score;
  nextBtn.style.display = 'block';

  Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
}

function triggerCoinRain() {
  const numberOfCoins = 20;
  const coinContainer = document.getElementById('coin-container');
  coinContainer.innerHTML = ''; // Clear previous coins

  for (let i = 0; i < numberOfCoins; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 100}%`; // Random horizontal position
    coin.style.setProperty('--delay', `${Math.random()}s`); // Random delay for falling
    coinContainer.appendChild(coin);

    // Remove the coin after animation ends
    setTimeout(() => {
      coin.remove();
    }, 2000);
  }
}



function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizScreen.style.display = 'none';
  leaderboardContainer.style.display = 'block';
  updateLeaderboard();
}

function updateLeaderboard() {
  const username = usernameInput.value;
  leaderboard.push({ name: username, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboardList.innerHTML = '';

  leaderboard.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `${entry.name}: ${entry.score}`;
    leaderboardList.appendChild(listItem);
  });
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  leaderboardContainer.style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);


document.addEventListener('DOMContentLoaded', function() {
 
  

// Example of handling answer
function handleAnswer(correct) {
  if (correct) {
    triggerCoinRain();
    // Display correct feedback, explanation, etc.
  } else {
    // Handle incorrect answer
  }
}
document.getElementById('correct-btn').addEventListener('click', () => {
  handleAnswer(true);
});

document.getElementById('wrong-btn').addEventListener('click', () => {
  handleAnswer(false);
});

});

