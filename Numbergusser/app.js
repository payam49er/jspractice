
//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min,max),
    guessesLeft = 3;

//UI Elements
const uiGame = document.getElementById('game'),
      uiMinNum  = document.querySelector('.min-num'),
      uiMaxNum = document.querySelector('.max-num'),
      uiGuessBtn = document.getElementById('guess-btn'),
      uiGuessInput = document.getElementById('guess-input'),
      uiMessage = document.querySelector('.message');

//Assign UI min and max
uiMinNum.textContent = min;
uiMaxNum.textContent = max;

//play again event listener

game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        uiGuessInput.value = '';
        window.location.reload();
    }
});




//listen for guess
uiGuessBtn.addEventListener('click',()=>{
    
    let guess = parseInt(uiGuessInput.value);
    
    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    //check if won
    if(guess === winningNum){
        //disable input
        gameOver(true,`${guess} is correct!, you win!`);
    }else{
        //wrong number
        guessesLeft -=1;
        if(guessesLeft === 0){
            //game over, lost
        gameOver(false,`${guess} is incorrect!, you lost!, the correct number was ${winningNum}`);
        }else{
            uiGuessInput.value = '';
            //game continues - answer wrong        
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
            
        }
        
    }
})

function setMessage(msg,color){
    uiMessage.style.color = color;
    uiMessage.textContent = msg;
}


function gameOver(result,msg){
    let color;
    result === true ? color = 'green' : color = 'red';
    uiGuessInput.disabled = result;
    uiGuessInput.style.borderColor = color;
    setMessage(msg, color); 

    //play again
    uiGuessBtn.value = 'Play Again!';
    uiGuessBtn.className += 'play-again';
}

function getWinningNum(min,max){
    let num = Math.random()*10;  
    return Math.floor(num)+1;
}