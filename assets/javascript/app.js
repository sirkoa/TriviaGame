$(document).ready(function () {


  var questions = [];
  var answerBank = [];
  var gameInterval;
  var timeLeft = 500;
  var correct = 0;
  var incorrect = 0;

  function newGame() {
    clearInterval(gameInterval)
    $("#answer").empty()
    $("#incorrectanswer").empty()
    $(".questions").empty();
    $(".form-element").show();
    answerBank = [];
    correct = 0;
    incorrect = 0;
    timeLeft = 500;
    gameInterval = setInterval(function () {

      timeLeft--;
      $(".timer-div").text("Time left is: " + timeLeft);

      if (timeLeft <= 0) {
        clearInterval(gameInterval)
        displayResults();
      }
    }, 1000);

    questions = [{
        question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
        answer: "CD player",
        choices: ["home computer", "CD player", "cordless phone", "dishwasher"]
      },
      {
        question: "The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?",
        answer: "$1",
        choices: ["$1", "$5", "$10", "$20"]
      },
      {
        question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
        answer:"cocker spaniel",
        choices: ["poodle", "German shepard", "Labrador retriever", "cocker spaniel"]
      },
      {
        question:"Which of the following rivers is the longest?",
        answer:"Congo River",
        choices:["Congo River","Lena River", "Niger River", "Irtysh River"]
      }
    ]

    // Loops through questions and prints
    for (var i = 0; i < questions.length; i++) {
      // Creates question section
      var printQuestion = $("<div>");

      // Add bootstrap class for styles
      printQuestion.addClass("form-group");


      // Create area for question to be actually printed
      var question = $("<label>");
      question.addClass("biggerFont")
      // Give that section it's question
      question.text(questions[i].question);

      // Loop through possible choices for each question and print them out (using j because i is already being used)
      for (var j = 0; j < questions[i].choices.length; j++) {
        // Create div for each radio button
        var choice = $("<div>");
        // Add bootstrap class to it
        choice.addClass("form-check radio");

        // Create area for choice/possible answer
        var choiceText = $("<label>");
        // Give them styles
        choiceText.addClass("form-check-label");
        // Give it text
        choiceText.text(questions[i].choices[j])

        // Create actual radio button
        var choiceInput = $("<input>");
        // Adds bootstrap class
        choiceInput.addClass("form-check-input");
        // Sets input type to radio (instead of text, number, etc)
        choiceInput.attr("type", "radio");
        // Give radio buttons for each question same name so they are related to one another (select one and the others deselect)
        choiceInput.attr("name", i);
        // Give it a data attribute to potentially check against for correct question
        choiceInput.attr("data-question", i);
        // Give it a data attribute to check against for correct answer
        choiceInput.attr("data-answer", questions[i].choices[j]);

        // Place ChoiceText and ChoiceInput into Choice div
        choice.append(choiceInput).append(choiceText);

        // Append entire choice to question
        question.append(choice);

      }
      // Append entire question to div
      printQuestion.append(question)

      // Append entire div to form
      $(".questions").append(printQuestion);


    }
  }

  // Bind event handler for all elements with a radio type (see jQuery selectors)
  $("body").on("click", ".submit", function (e) {

    e.preventDefault();

    displayResults();

  })

function displayResults() {
  clearInterval(gameInterval)
  $(".form-element").hide();
  for (var i = 0; i < questions.length; i++) {
    var answer = $('input[type="radio"][name=' + i + ']:checked').attr("data-answer");
    console.log(answer);
    answerBank.push(answer);
  }

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].answer === answerBank[i]) {

      console.log("correct!")
      correct  ++
    } else {
      incorrect ++
      console.log("incorrect!");
    }
  }
  $("#answer").text("correct " + correct)
  $("#incorrectanswer").text("incorrect " + incorrect)

}

$(".new-game").on("click", newGame);
newGame();
  


})