document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    let chosenAnswer = '';

    function answer(){
        chosenAnswer = this.textContent[0];
        console.log("chosenAnswer");
        console.log(chosenAnswer);
    }
    buttons.forEach(element => element.addEventListener('click', answer));
});