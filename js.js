/**
 * JavaScript Quiz App
 *
 * This JavaScript Quiz App is a web application that presents multiple-choice questions to users
 * and provides immediate feedback on their answers. It keeps track of the user's selections and
 * displays the final score at the end of the quiz.
 */

(function() {
  // Array of quiz questions
  var questions = [
    {
      question: "What is 2 * 5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2
    },
    {
      question: "What is 3 * 6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4
    },
    {
      question: "What is 8 * 9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0
    },
    {
      question: "What is 1 * 7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3
    },
    {
      question: "What is 8 * 8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }
  ];

  var questionCounter = 0; // Tracks the current question number
  var selections = []; // Array containing user choices
  var quiz = $('#quiz'); // Quiz div object

  /**
   * Display initial question
   */
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      // Check if there are more questions to display
      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();

        // Restore user's previous selection (if any)
        if (!isNaN(selections[questionCounter])) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Control display of 'prev' and 'next' buttons
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {
          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  /**
   * Create and return the div element that contains the question and answer choices.
   * @param {number} index - The index of the question.
   * @returns {jQuery} - The question element.
   */
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>').text('Question ' + (index + 1) + ':');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  /**
   * Create and return a list of radio buttons for the answer choices of a given question.
   * @param {number} index - The index of the question.
   * @returns {jQuery} - The list of radio buttons.
   */
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';

    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }

    return radioList;
  }

  /**
   * Read the user's selection and store it in the selections array.
   */
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  /**
   * Calculate the score and return a paragraph element to display the final score.
   * @returns {jQuery} - The score element.
   */
  function displayScore() {
    var score = $('<p>', { id: 'question' });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!!!');
    return score;
  }
