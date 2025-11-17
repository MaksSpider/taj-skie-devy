document.addEventListener('DOMContentLoaded', () => {
    let correct_answer = null;
    get_data();
    const buttons = document.querySelectorAll('button');
    const printer = document.querySelector('.display');
    const next = document.querySelector('.next');

    buttons.forEach(element => element.addEventListener('click', answer));
    next.addEventListener('click', changeQuestion);

    let currentQuestion = 0;
    let lifes = 3;
    let chosenAnswer = '';

    async function get_data(){
        fetch('./data.json').then(
        response => {return response.json()}).then(
            data => {
                for(let i = 0; i < data.length(); i++){
                    setData(data.questions[0]);
                    //answer = await set_aswer
                }
            }
    );
    }

    async function set_aswer(btn){
        return new Promise(resolve =>  btn.onclick = set_btn_value => resolve());
    }

    function set_btn_value() {
        return this.textContent[0];
    }

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
                setData();
            }
        }
        console.log(chosenAnswer);
    }

    function setData(data){
        printer.value = data.question;
        for(let i = 0; i< buttons.length; i++){
            buttons[i].textContent += data.answers[i];
        }
        correct_answer = data.correct_answer;
    }
    function changeQuestion(){
        currentQuestion++;
        if(currentQuestion >= data.questions.length){
            alert("You have completed the quiz!");
            currentQuestion = 0;
            lifes = 3;
        }
        clear();
        setData();
        
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
});