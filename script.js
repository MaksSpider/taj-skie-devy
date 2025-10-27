const button = document.querySelector(".show_more");
const dropdownMenu = document.querySelector("nav").childNodes;
let content = document.querySelector(".fa-solid.fa-bars");

button.addEventListener("click", () => {
    if(content.className == "fa-solid fa-bars") content.className = "fa-solid fa-xmark";
    else  content.className = "fa-solid fa-bars";
    for(const node of dropdownMenu){
        if(node.className == "hide") node.className = "show" ;
        else if(node.className == "show") node.className = "hide" ;
    }
});