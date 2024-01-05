//MALETA
//Quan es clica el botó a la class "recomanacions" se li injecta o extreu una segona class que amaga el contingut al css
function toggleContent(button) {
    button.parentNode.querySelector('.recomanacions').classList.toggle('contingut-amagat');
}

//GALERIA