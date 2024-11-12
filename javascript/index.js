window.addEventListener("load", main);

var popup = document.getElementById("popup");
var btn = document.getElementById("openPopup");
var span = document.getElementById("closePopup");
var okButton = document.getElementById("okButton");
var nameInput = document.getElementById("nameInput");


//Main Function

function main () {

    var folders = document.querySelectorAll(".folder");
    folders.forEach(div =>{
        div.addEventListener("click", abrir_pasta);
    })
    //poppups 
    var popups = document.querySelectorAll(".openPopup")
    popup.forEach(div =>{
        div.addEventListener("click", abrir_pasta);
    })
    
}

//File Functions
function abrir_pasta(){
    const label = this.querySelector('label');
    const labelText = label.textContent;

    ficheiros = localStorage.getItem(labelText);
    mostrar_ficheiros(ficheiros);
    update_topbar(labelText);
}

function mostrar_ficheiros(ficheiros){
    let contentDiv = document.querySelector('.content');

    let content = `<div><img src="Images/plus.png"><br><label>Criar Albúm</label></div>`
    content += ficheiros

    contentDiv.innerHTML = content
}

function update_topbar(label){
    // Get the <h1> element inside .top_bar
    const titulo = document.querySelector('.top_bar h1');

    // Change the text content of the <h1>
    titulo.textContent = label;
}
function abre_popups(){
    popup.style.display = "block";

}

// btn.onclick = function() {
//     popup.style.display = "block";
//     console.log("Click!")
// }
// span.onclick = function() {
//     popup.style.display = "none";
// }
// okButton.onclick = function() {
//     var name = nameInput.value;
//     if (name) {
//         nameInput.value = ''; // Clear the input field
//         popup.style.display = "none"; // Close the popup
//     }
// }  