"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const toggleDetailsButton = document.getElementById("toggleDetails");
    const photoContainerAnimation = document.querySelector(".photo-container-animation");

    if (toggleDetailsButton && photoContainerAnimation) {
        toggleDetailsButton.addEventListener("click", (event) => {
            event.preventDefault();
            photoContainerAnimation.classList.toggle("rotated");
        });
    }
});





