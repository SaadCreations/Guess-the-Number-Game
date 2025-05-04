document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let randomNumber;
    let attempts = 0;
    const maxAttempts = 3;
    
    // DOM elements
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const resetBtn = document.getElementById('reset-btn');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    
    // Initialize the game
    initGame();
    
    // Event listeners
    guessBtn.addEventListener('click', checkGuess);
    resetBtn.addEventListener('click', initGame);
    
    // Allow Enter key to submit guess
    guessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // Initialize game function
    function initGame() {
        randomNumber = Math.floor(Math.random() * 10) + 1;
        attempts = 0;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        message.textContent = '';
        message.className = '';
        guessInput.value = '';
        guessInput.disabled = false;
        guessBtn.disabled = false;
        guessInput.focus();
    }
    
    // Check guess function
    function checkGuess() {
        const userGuess = parseInt(guessInput.value);
        
        // Validate input
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            message.textContent = 'Please enter a valid number between 1 and 10';
            message.className = 'error';
            guessInput.value = '';
            guessInput.focus();
            return;
        }
        
        // Increment attempts
        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        
        // Check if guess is correct
        if (userGuess === randomNumber) {
            message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
            message.className = 'success';
            endGame();
        } else {
            // Check if max attempts reached
            if (attempts >= maxAttempts) {
                message.textContent = `Game over! The number was ${randomNumber}.`;
                message.className = 'error';
                endGame();
            } else {
                // Provide hint
                const hint = userGuess < randomNumber ? 'higher' : 'lower';
                message.textContent = `Wrong guess! Try a ${hint} number. ${maxAttempts - attempts} attempts left.`;
                message.className = 'error';
                guessInput.value = '';
                guessInput.focus();
            }
        }
    }
    
    // End game function
    function endGame() {
        guessInput.disabled = true;
        guessBtn.disabled = true;
    }
});