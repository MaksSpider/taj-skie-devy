document.addEventListener('DOMContentLoaded', () => {
    let quizData = null; 
    let currentQuestion = 0;
    let lifes = 3;
    
    const buttons = document.querySelectorAll('button');
    const printer = document.querySelector('.display'); // Upewnij się, że używasz klasy 'display' dla inputa
    const next = document.querySelector('.next');

    initQuiz(); 

    buttons.forEach(element => element.addEventListener('click', answer));
    if (next) { 
        next.addEventListener('click', changeQuestion);
        next.style.display = "none";
    }

    async function initQuiz() {
        try {
            quizData = await get_data(); 
            console.log("Dane quizu załadowane pomyślnie.");
            displayQuestion(); 
            
        } catch (error) {
            console.error("Błąd podczas ładowania danych quizu:", error);
            printer.value = "Błąd ładowania danych!"; 
        }
    }

    async function get_data() {
        const response = await fetch('./data.json');
        
        if (!response.ok) {
            throw new Error(`Błąd sieci: ${response.status}`);
        }
        
        const data = await response.json();
        return data.questions;
    }

    function displayQuestion() {
        if (!quizData || quizData.length === 0) return;

        const currentQ = quizData[currentQuestion];

        printer.value = currentQ.question; 
        
        const answersPrefix = ['A. ', 'B. ', 'C. ', 'D. '];
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = answersPrefix[i] + currentQ.answers[i]; 
            buttons[i].disabled = false; 
        }
        
        if (next) next.style.display = "none";
    }

    function answer() {
        if (!quizData) return;

        const currentQ = quizData[currentQuestion];
        const chosenAnswerLetter = this.textContent.trim()[0]; 

        if (chosenAnswerLetter === currentQ.correct_answer) {
            console.log("Poprawna!");
            this.style.backgroundColor = "#2ecc71"; 
            buttons.forEach(btn => btn.disabled = true);
            if (next) next.style.display = "block";
        } else {
            this.style.backgroundColor = "#e74c3c"; 
            lifes--;
            console.log(`Życia pozostałe: ${lifes}`);
            
            if (lifes === 0) {
                alert("Game Over!");
                resetQuiz();
            }
        }
    }

    function changeQuestion() {
        currentQuestion++;
        
        if (currentQuestion >= quizData.length) {
            alert("Ukończyłeś cały quiz!");
            resetQuiz();
        } else {
            clearStyles();
            displayQuestion();
        }
    }
    
    function resetQuiz() {
        currentQuestion = 0;
        lifes = 3;
        clearStyles();
        displayQuestion();
    }

    function clearStyles() {
        buttons.forEach(btn => {
            btn.textContent = btn.textContent.split(".")[0] + ". "; 
            btn.style.backgroundColor = ''; 
            btn.disabled = false; 
        });
        if (next) next.style.display = "none";
    }
});