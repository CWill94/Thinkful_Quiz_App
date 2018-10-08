const QUIZQUESTIONS = 
[   
    {
        question: "What is the largest country in the world?",
        answers : ["Russia","United States","China", "India"],
        correct: "Russia"
    },

    {
        question: "What is 2+2?",
        answers: ["2","4","Fish obviously", "I can't math"],
        correct: "Fish obviously"
    },

    {
        question: "How much wood could a wood chuck if a woodchuck could chuck wood?",
        answers: ["1", "What?", "10", "None"],
        correct: "1"
    },

];
let USERSCORE =
{
    correct: 0,
    incorrect: 0
};

//on page load
let start = 0
$(confirmQuizLoad(start));

//renders question user must answer in the h1
function renderQuestion(object)
{
    let question = object.question;
    $('h1').html(question);
}

//renders score of user up to the previously answered questions
//renders what question the user is on
function renderUserScore(correct,incorrect, quiz)
{
    let userScore = correct + ':correct ' + incorrect +
    ':incorrect';
    let currentQuestion = start + 1;
    let questionNumber = currentQuestion + " out of " + quiz.length;

    $('.question-number').html(questionNumber);
    $('.quiz-score').html(userScore); 
}


//gives user multiple choices for the question
function renderChoices(object)
{
    let quizArray = object.answers;
    let radioButtonFormat = quizArray.map((item,index) =>
    toRadioButtonFormat(quizArray[index]));
    $('fieldset').html(radioButtonFormat.join(""));
}

//helper function that puts answers into a radio button format
function toRadioButtonFormat(string)
{
    return `<input type="radio" class = "choices" name="answer" value="${string}"> ${string}<br>`;
}

//evaluate
//update correct/incorrect
//show results
function submitButton()
{
    $('.submit-button').unbind("click").on('click', event =>
    {
        event.preventDefault();
        $('.submit-button').prop("disabled",true);

        let userAnswer = $('input[name=answer]:checked').val();
        let correctAnswer = QUIZQUESTIONS[start].correct;
        let isCorrect;
        //Checks if user answer is correct or not
        if (userAnswer == null) {
            alert('Please Select an answer');
            $('.submit-button').prop("disabled", false);
        }

        else if (userAnswer == correctAnswer)
        {
            isCorrect = true;
        }
        else
        {
            isCorrect = false;
        }


        // Determines whether or not user answer is correct
        if (isCorrect)
        {
            alert('You chose the correct answer!');
            $('footer.p').html("you chose the correct answer");
            USERSCORE.correct++;
            $('.next-button').prop("disabled", false);

        }

        else if (!isCorrect && userAnswer != null)
        {
            alert(`You put ${userAnswer} the correct answer was ${QUIZQUESTIONS[start].correct}`);
            $('footer.p').html("you chose an incorrect answer");
            USERSCORE.incorrect++;;
            $('.next-button').prop("disabled", false);
        }
    });

}


//will render next question and choices for user.
function nextButton()
{
    $('.next-button').unbind("click").on('click', event => 
    {
        event.preventDefault();
        if(start == QUIZQUESTIONS.length-1)
        {
            $('.question-header').html(`You got ${USERSCORE.correct} out of ${QUIZQUESTIONS.length}`);
            $('.final-message').html("Think you can do better? Retry the quiz");
            $('.quiz-score').html("");
            $('.restart-button').prop("disabled",false);
            //$('.choices').html(" ");     
            $('.choices').toggle();
        }
        else
        {

            start ++;
            $('.submit-button').prop("disabled",false);
            confirmQuizLoad(start);

        }

    });

}
function restartButton()
{
    $('.restart-button').on('click',event =>
    {
        event.preventDefault();
        USERSCORE.correct = 0;
        USERSCORE.incorrect = 0;
        start = 0;
    
        $('.next-button').prop("disabled",true);
        $('.choices').toggle();
        confirmQuizLoad(start);
    });
}


function confirmQuizLoad(index)
{

    let question = QUIZQUESTIONS[start];
    let userCorrect = USERSCORE.correct;
    let userIncorrect = USERSCORE.incorrect;
    let choices = QUIZQUESTIONS[start];

    renderQuestion(question);
    renderUserScore(userCorrect,userIncorrect,QUIZQUESTIONS);
    renderChoices(choices);
    submitButton();
    nextButton();
    restartButton();

    $('.submit-button').prop("disable",false);
    $('.next-button').prop("disabled",true);
    $('.restart-button').prop("disabled",true);
}