function beginQuiz () 
{
    $('#begin-button').on('click',event =>
    {
        event.preventDefault();
        $('.quiz-container').toggle();
        $('.begin-container').toggle();
    });
}

$(beginQuiz);
