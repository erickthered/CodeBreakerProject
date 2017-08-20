let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess()
{
    let input = document.getElementById('user-guess');
    if ( answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return false;
    } else {
        attempt.value++;
    }
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

function setMessage(msg)
{
    let message = document.getElementById('message');
    message.innerHTML = msg;
}

function setHiddenFields()
{
    answer.value = Math.floor(Math.random()*10000);
    answer.value = answer.value + '';
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}

function validateInput(value)
{
    if (value.length == 4) {
        return true;
    }
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(input)
{
    let results = document.getElementById('results');
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let count = 0;
    for (i=0; i<4; i++) {
        if (input[i] === answer.value[i]) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            count++;
        } else {
            if (answer.value.indexOf(input[i]) >= 0) {
                html += '<span class="glyphicon glyphicon-transfer"></span>';
            } else {
                html += '<span class="glyphicon glyphicon-remove"></span>';
            }
        }
    }
    html += '</div></div>';

    results.innerHTML += html;
    return count === 4;
}

function showAnswer(isWinner)
{
    let code = document.getElementById("code");
    code.innerHTML = answer.value;
    if (isWinner) {
        code.className += ' success';
    } else {
        code.className += ' failure';
    }
}

function showReplay()
{
    let guessingDiv = document.getElementById('guessing-div');
    let replayDiv = document.getElementById('replay-div');
    guessingDiv.style.display = 'none';
    replayDiv.style.display = 'block';
}