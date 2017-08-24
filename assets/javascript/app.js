$(document).ready(function () {


  var questions = [];
  var answerBank = [];
  var gameInterval;
  var timeLeft = 500;
  var correct = 0
  var incorrect = 0

  function newGame() {
    answerBank = [];
    timeLeft = 500;
    gameInterval = setInterval(function () {
      timeLeft--;
      $(".timer-div").text("Time left is: " + timeLeft);
    }, 1000);

    questions = [{
        question: "question 1 name",
        answer: "etc",
        choices: ["answer 1", "answer 2", "etc"]
      },
      {
        question: "question 2 name",
        answer: "question 2 answer",
        choices: ["answer 1", "answer 2", "etc"]
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

    for (var i = 0; i < questions.length; i++) {
      var answer = $('input[type="radio"][name=' + i + ']:checked').attr("data-answer");
      console.log(answer);
      answerBank.push(answer);
    }

    for (var i = 0; i < questions.length; i++) {
      if (questions[i].answer === answerBank[i]) {
        console.log("correct!")
        correct  ++
        $("#answer").text("correct " + correct)
      } else {
        $("#incorrectanswer").text("incorrect " + incorrect)
        incorrect ++
        console.log("incorrect!");
      }
    }

  })


  newGame();


})