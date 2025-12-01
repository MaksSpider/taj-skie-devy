document.addEventListener('DOMContentLoaded', () => {
    let number = '';
    let dzialanie = 0;
    let operation = null;
    let calculate = null;
    let selectOperation = false;
    let numberButtons = document.querySelectorAll('.num');
    let operatos = document.querySelectorAll('.operator');
    const display = document.getElementById('display');

    function updateDisplay() {
        display.value = number;
    }

    function getNumber(){
        if(number == '0' ) number = this.textContent;
        else number += this.textContent;
        updateDisplay();
    }

    function getOperator(){
        if(!selectOperation){
            operation = this.textContent;
            switch (operation){
                case '+':
                    operation = 1;
                    break;

                case '-':
                    operation = 2;
                    break;

                case '*':
                    operation = 3;
                    break;

                case '/':
                    operation = 4;
                    break;
                default:
                    console.log("exception!!!");
            }
            dzialanie = Number(number);
            number = '';
        
        selectOperation = true;
        updateDisplay();
    }
    }

    function equals(){
        switch (operation){
            case 1:
                calculate = dzialanie + Number(number);
                break;
            case 2:
                calculate = dzialanie - Number(number);
                break;
            case 3:
                calculate = dzialanie * Number(number);
                break;
            case 4:
                if (Number(number) === 0){
                    alert("Nie dziel przez 0!!!");
                    return;
                }
                calculate = dzialanie / Number(number);
                break;
            default:
                console.log("exception!!!");
        }
        number = String(calculate);
        updateDisplay();
        selectOperation = false;
    }
    function clearDisplay(){
        number = '';
        dzialanie = 0;
        operation = null;
        calculate = null;
        updateDisplay();
    }

    numberButtons.forEach(el => el.addEventListener("click", getNumber));
    operatos.forEach(el => el.addEventListener("click", getOperator));
    document.querySelector(".equals").addEventListener("click", equals);
    document.querySelector(".clear").addEventListener("click", clearDisplay);
});
