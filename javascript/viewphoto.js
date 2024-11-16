"use strict";

document.addEventListener("DOMContentLoaded", function () {
    
    const detalhesButton = document.querySelector(".sidebar ul li a[href='#']");
    const photoContainer = document.getElementById("photo-container-animation");

    if (detalhesButton) {
        detalhesButton.addEventListener("click", function (event) {
            event.preventDefault(); 
            photoContainer.classList.toggle("rotated");
        });
    }
});




