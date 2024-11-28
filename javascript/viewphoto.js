"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const toggleDetailsButton = document.getElementById("toggleDetails");
    const photoContainerAnimation = document.querySelector(".photo-container-animation");

    let rotationAngle = 0; 

    if (toggleDetailsButton && photoContainerAnimation) {
        toggleDetailsButton.addEventListener("click", (event) => {
            event.preventDefault();

           
            rotationAngle += 180;

        
            photoContainerAnimation.style.transform = `rotateY(${rotationAngle}deg)`;
        });
    }
});



/* Tags */

document.addEventListener("DOMContentLoaded", function () {
    const addTagOption = document.getElementById("addTagOption");
    const tagContainer = document.getElementById("tagContainer");
    
    addTagOption.addEventListener("click", function (event) {
        event.preventDefault();

        // Criar um novo wrapper para a tag
        const newTagWrapper = document.createElement("div");
        newTagWrapper.className = "user-tag"; 

        // Criar a caixa de texto para a tag
        const newTagInput = document.createElement("input");
        newTagInput.className = "tag-input"; 
        newTagInput.placeholder = "";

        // Botão para remover a tag
        const deleteButton = document.createElement("button");
        deleteButton.className = "remove-tag-button";
        deleteButton.innerHTML = "X";

        // Adicionar a caixa de texto e o botão ao wrapper
        newTagWrapper.appendChild(newTagInput);
        newTagWrapper.appendChild(deleteButton);

        // Adicionar a tag ao container
        tagContainer.appendChild(newTagWrapper);

        newTagInput.focus();

        // Confirmação da tag ao pressionar Enter
        newTagInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && newTagInput.value.trim() !== "") {
                event.preventDefault();

                // Transformar o campo de input em uma tag (não editável)
                const tagContent = document.createElement("span");
                tagContent.className = "tag-content";
                tagContent.textContent = newTagInput.value.trim();
                
                newTagWrapper.innerHTML = ""; // Limpa o conteúdo atual (input + botão)
                newTagWrapper.appendChild(tagContent);
                newTagWrapper.appendChild(deleteButton); // Adiciona novamente o botão de remoção
                
                // Desabilitar o botão de remoção
                deleteButton.disabled = false;
            }
        });

        // Excluir a tag ao clicar no botão de remoção
        deleteButton.addEventListener("click", function () {
            tagContainer.removeChild(newTagWrapper);
        });
    });
});



// // Remove fotos
// const deletePhotoButton = document.getElementById("deletePhotoButton");

// deletePhotoButton.addEventListener("click", function () {
//     photoPopup.style.display = "flex";

//     const confirmRemovePhoto = photoPopup.querySelector("button.confirm");
//     const cancelRemovePhoto = photoPopup.querySelector("button.cancel");
//     const closePhotoPopup = photoPopup.querySelector(".close-popup");

//     // Confirma a remoção da foto
//     confirmRemovePhoto.onclick = function () {
//         const photoToDelete = document.getElementById("photoToDelete");
//         if (photoToDelete) {
//             photoToDelete.remove();
//         }
//         photoPopup.style.display = "none";
//     };

//     // Cancela a remoção da foto
//     cancelRemovePhoto.onclick = function () {
//         photoPopup.style.display = "none";
//     };

//     // Fecha o pop-up sem ação
//     closePhotoPopup.onclick = function () {
//         photoPopup.style.display = "none";
//     };
// });













