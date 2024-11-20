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

/* Tags */

document.addEventListener("DOMContentLoaded", function () {
    const addTagOption = document.getElementById("addTagOption"); // Opção na sidebar
    const tagContainer = document.getElementById("tagContainer"); // Container das tags

    addTagOption.addEventListener("click", function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link

        // Cria um novo input para a tag
        const newTagInput = document.createElement("input");
        newTagInput.type = "text";
        newTagInput.className = "action-input";
        newTagInput.placeholder = `Tag ${tagContainer.childElementCount + 1}`;

        // Adiciona o novo input ao container
        tagContainer.appendChild(newTagInput);
    });
});






