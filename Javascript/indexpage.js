function beginQuiz () 
{
    $('.begin-quiz').submit(function(event)
    {
        event.preventDefault();
        $('.quiz-container').toggle();
        $('.begin-container').toggle();
    });
}

$(beginQuiz);
