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

document.addEventListener("DOMContentLoaded", function () {
    const addTagOption = document.getElementById("addTagOption"); // Botão para adicionar tags
    const tagContainer = document.getElementById("tagContainer"); // Contêiner de tags

    addTagOption.addEventListener("click", function (event) {
        event.preventDefault();

        // Criar nova tag editável
        const newTag = document.createElement("div");
        newTag.className = "action-button user-tag"; // Adiciona classe para estilização
        newTag.contentEditable = "true"; // Torna a tag editável
        newTag.textContent = "Nova Tag"; // Texto inicial da tag

        // Adiciona evento para perder foco
        newTag.addEventListener("blur", () => {
            if (newTag.textContent.trim() === "") {
                newTag.textContent = "Nova Tag"; // Reseta texto se ficar vazio
            }
        });

        // Criar botão de remover
        const deleteButton = document.createElement("span");
        deleteButton.className = "delete-tag";
        deleteButton.textContent = "×"; // Ícone de apagar
        deleteButton.addEventListener("click", () => tagContainer.removeChild(newTag));
        newTag.appendChild(deleteButton);

        // Adiciona a tag ao contêiner
        tagContainer.appendChild(newTag);
    });
});






