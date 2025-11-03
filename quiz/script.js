import data from './data.json' with { type: "json" };
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const printer = document.querySelector('.display');
    const next = document.querySelector('.next');

    buttons.forEach(element => element.addEventListener('click', answer));
    next.addEventListener('click', changeQuestion);

    let currentQuestion = 0;
    let lifes = 3;
    let chosenAnswer = '';

    function answer(){
        chosenAnswer = this.textContent[0];
        if(chosenAnswer == data.questions[currentQuestion].correct_answer){
            console.log("poprawna");
            console.log(this);
            this.style.backgroundColor = "#2ecc71";
            next.style.display = "block";
        }else{
            this.style.backgroundColor = "#e74c3c";
            lifes --;
            console.log(lifes);
            if(lifes == 0){
                alert("Game Over");
                currentQuestion = 0;
                lifes = 3;
                clear();
                setText();
            }
        }
        console.log(chosenAnswer);
    }

    function setText(){
        printer.value = data.questions[currentQuestion].question;
        for(let i = 0; i< buttons.length; i++){
            buttons[i].textContent += data.questions[currentQuestion].answers[i];
        }
    }
    function changeQuestion(){
        currentQuestion++;
        if(currentQuestion >= data.questions.length){
            alert("You have completed the quiz!");
            currentQuestion = 0;
            lifes = 3;
        }
        clear();
        setText();
        
    }
    function clear(){
        let answers = ['A. ', 'B. ', 'C. ', 'D. '];
        for(let i = 0; i< buttons.length; i++){
            buttons[i].textContent = answers[i];
            buttons[i].style.backgroundColor = "#2980b9";
        }
        next.style.display = "none";
        chosenAnswer = '';
    }

    setText();
});