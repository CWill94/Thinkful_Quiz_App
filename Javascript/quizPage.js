const QUIZQUESTIONS = 
[   
    {
        question: "What is the largest country in the world?",
        answers : ["Russia","United States","China", "India"],
        correct: "Russia"
    },

    {

        question:"How many people are there in the world?",
        answers:["1 billion", "6 billion","7 billion", "4 billion"],
        correct:"7 billion"
    },

    {
        question:"What is the largest river in the world?",
        answers:["Nile","Amazon","Mississippi","Chang Jiang"],
        correct:"Amazon"
    },

    {
        question:"What is the highest mountain in the world?",
        answers: ["K-2", "Mount Everest", "Kangchenjunga", "Lhotse"],
        correct:"Mount Everest"
    },

    {
        question:"Which country is the largest producer of coffee?",
        answers: ["Italy","England","Brazil","United States"],
        correct:"Brazil"
    },

    {
        question:"Which is the biggest state in the United States",
        answers:["California","Florida","Texas","Alaska"],
        correct:"Alaska"
    }

];
var USERSCORE =
{
    correct: 0,
    incorrect: 0
};

//on page load
var start = 0
$(confirmQuizLoad(start));

//renders question user must answer in the h1
function renderQuestion(object)
{
    let question = object.question;
    $('.question-header').html(question);
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
    return `<label for = '${string}'> ${string}</label>
            <input type="radio" id = '${string}' class = "choices" name="answer" value="${string}">
            <br>`;
}

//evaluatoion of user answer
function evaluate(userAnswer)
{
    let correctAnswer = QUIZQUESTIONS[start].correct;

    if (userAnswer == correctAnswer)
    {
        return true;
    }
    else
    {
        return false;
    }
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

        //Checks if user answer is correct or not
        if (userAnswer == null)
        {
            $(".feedback").html('Please Select an answer');
            $('.submit-button').prop("disabled", false);
        }
        // Determines whether or not user answer is correct
        let isCorrect = evaluate(userAnswer);
        if (isCorrect)
        {
            $(".feedback").html('You chose the correct answer!');
            USERSCORE.correct++;
            $('.next-button').prop("disabled", false);

        }

        else if (!isCorrect && userAnswer != null)
        {
            $(".feedback").html(`You put ${userAnswer} the correct answer was ${QUIZQUESTIONS[start].correct}`);
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
            $('.results').html(`You got ${USERSCORE.correct} out of ${QUIZQUESTIONS.length}`);
            $('.final-message').html("Think you can do better? Retry the quiz");
            $('.quiz-container').toggle();    
            $('.final-container').toggle();
        }
        else
        {

            start ++;
            $('.submit-button').prop("disabled",false);
            $(".feedback").html("");
            confirmQuizLoad(start);

        }

    });

}

//resets userscore, and reloads the quiz back to the first quesiton
function restartButton()
{
    $('.restart-quiz').unbind("click").on('click',event =>
    {
        event.preventDefault();
        USERSCORE.correct = 0;
        USERSCORE.incorrect = 0;
        start = 0;
    
        $(".feedback").html("");
        $('.final-results').toggle();
        $('.quiz-container').toggle();
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

    $('.submit-button').prop("disabled",false);
    $('.next-button').prop("disabled",true);
}