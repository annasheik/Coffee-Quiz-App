'use strict';
let questionNumber = 0;
// score 1 point - 10% height
let score = 0;

//create question html
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required="">
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required="">
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required="">
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required="">
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  }
  else {
    renderResults();
     restartQuiz();
    $('.questionNumber').text(10);

  }
}

//increment questionNumber
function changeQuestionNumber() {
  //if(questionNumber < STORE.length) {
    questionNumber ++;
  //}
    $('.questionNumber').text(questionNumber+1);

}
// increment score
function changeScore () {
  score ++;
  $("#addiction_fill").css("height", "+=10");
}

//start Quiz
function startQuiz() {
  $('.quizStart').on('click', '.quizStartButton', function(event)
  {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
    $("#addiction_fill").css("height", "1px");
  });
}

//render Question Page 
function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
}

//User selects and submits answer
function userSelectAnswer () {
  $("form").on("submit", function(event) {
    event.preventDefault();
   // e.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass("correct");
      ifAnswerIsCorrect();
    }
    else {
      selected.parent().addClass("wrong");
      ifAnswerIsWrong();
    }
  });
}
// html - user answer is correct
function correctAnswerHTML () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $(".questionAnswerForm").html(`<div class="feedbackForm">
      <img src="${STORE[questionNumber].img}" alt="${STORE[questionNumber].alt}">
      <h3>You got it right!</h3>
      <p>${STORE[questionNumber].textToDisplay}</p>
      
      <button type="button" class="nextButton">Next</button>
      
    </div>`)
}

//html - user answer is wrong
function wrongAnswerHTML () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $(".questionAnswerForm").html(`<div class="feedbackForm">
      <img src="${STORE[questionNumber].img}" alt="${STORE[questionNumber].alt}">
      <h3>You got it wrong!</h3>
      <p class="correctAnswer">The correct answer is: ${STORE[questionNumber].correctAnswer}</p>
      <p>${STORE[questionNumber].textToDisplay}</p>
      
      <button type="button" class="nextButton">Next</button>
      
    </div>`);
}
// if answer is correct 
function ifAnswerIsCorrect () {
  correctAnswerHTML();
  changeScore();
  
}

// if answer is wrong 
function ifAnswerIsWrong () {
  wrongAnswerHTML();
}






//Render next question when user clicks next
function renderNextQuestion() {
  $(".questionAnswerForm").on("click", ".nextButton", function(event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

// render results depending on a score
function renderResults () {
  if (score >= 8) {
    $(".questionAnswerForm").html(`<div class="resultsPage">
      <h3>You got ${score}/10!</h3>
      <img src="https://media.giphy.com/media/3o6ZtqblZAoYMjFLi0/giphy-tumblr.gif" class="resultsImg" alt="coffee pouring into a white cup">
      <p class="results">Congratulations! You are a coffee expert!</p>
      
      <button class="restartButton">Restart Quiz</button>
      
    </div>`);
  }
  else if (score < 8 && score >= 5) {
    $(".questionAnswerForm").html(`<div class="resultsPage">
      <h3>You got ${score}/10!</h3>
      <img src="https://media.giphy.com/media/3o6ZtqblZAoYMjFLi0/giphy-tumblr.gif" class="resultsImg" alt="coffee pouring into a white cup">
      <p class="results">You know a little about coffee but you are not an expert.</p>
      
      <button class="restartButton">Restart Quiz</button>
      
    </div>`);
  }
  else {
     $(".questionAnswerForm").html(`<div class="resultsPage">
      <h3>You got ${score}/10!</h3>
      <img src="https://media.giphy.com/media/3o6ZtqblZAoYMjFLi0/giphy-tumblr.gif" class="resultsImg" alt="coffee pouring into a white cup">
      <p class="results">You should probably stick to a tea!</p>
      
      <button class="restartButton">Restart Quiz</button>
      
    </div>`);
  }
}

//Restart quiz 
function restartQuiz() {
  $(".resultsPage").on("click", ".restartButton", function (event) {
    location.reload();
  });
}

//Create quiz
function createQuiz () {
 startQuiz();
 renderQuestion();
 userSelectAnswer();
 renderNextQuestion();
 restartQuiz();
}
createQuiz();
