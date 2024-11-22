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
    const confirmationPopup = document.getElementById("confirmationPopup");
    const confirmButton = document.getElementById("confirmButton");
    const cancelButton = document.getElementById("cancelButton");
    const closeConfirmationPopup = document.getElementById("closeConfirmationPopup");

    let tagToRemove = null; // Variável para armazenar a tag que será removida

    // Função para adicionar uma nova tag
    addTagOption.addEventListener("click", function () {
        const newTag = document.createElement("div");
        newTag.className = "tag"; // Adiciona a classe 'tag'
        
        // Conteúdo da tag (editável)
        const tagContent = document.createElement("span");
        tagContent.className = "tag-content";
        tagContent.contentEditable = true;
        tagContent.textContent = ""; 
        
        // Botão de remoção "X"
        const removeButton = document.createElement("button");
        removeButton.className = "remove-tag-button"; 
        removeButton.textContent = "×"; 
        
        newTag.appendChild(tagContent);
        newTag.appendChild(removeButton);
        tagContainer.appendChild(newTag); 

      
        tagContent.focus();

        
        removeButton.addEventListener("click", function () {
            tagToRemove = newTag; 
            confirmationPopup.style.display = 'flex'; 
        });
    });

    
    confirmButton.addEventListener("click", function () {
        if (tagToRemove) {
            tagContainer.removeChild(tagToRemove); 
        }
        confirmationPopup.style.display = 'none'; 
        tagToRemove = null; 
    });

    
    cancelButton.addEventListener("click", function () {
        confirmationPopup.style.display = 'none'; 
        tagToRemove = null; 
    });

    closeConfirmationPopup.addEventListener("click", function () {
        confirmationPopup.style.display = 'none'; 
        tagToRemove = null; 
    });
});


/*Eliminar fotos */

document.addEventListener("DOMContentLoaded", function () {
    const deletePhotoButton = document.getElementById("deletePhotoButton");
    const photoDeleteConfirmationPopup = document.getElementById("photoDeleteConfirmationPopup");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");
    const closePhotoDeletePopup = document.getElementById("closePhotoDeletePopup");
    const photoToDelete = document.getElementById("photoToDelete");

    // Exibe o pop-up de confirmação quando o botão de eliminar foto for pressionado
    deletePhotoButton.addEventListener("click", function (event) {
        // Impede a ativação de outro pop-up, caso o usuário esteja no meio de uma ação de adicionar tags
        event.stopPropagation();
        photoDeleteConfirmationPopup.style.display = 'flex'; // Exibe o pop-up de remoção de foto
    });

    // Confirma a remoção da foto
    confirmDeleteButton.addEventListener("click", function () {
        // Remove a foto da área principal
        photoToDelete.remove();

        // Fecha o pop-up de confirmação
        photoDeleteConfirmationPopup.style.display = 'none'; 

        // Redireciona o usuário para o início da página (topo)
        window.scrollTo(0, 0);
    });

    // Cancela a remoção da foto
    cancelDeleteButton.addEventListener("click", function () {
        photoDeleteConfirmationPopup.style.display = 'none'; // Fecha o pop-up sem remover a foto
    });

    // Fechar o pop-up ao clicar no 'X'
    closePhotoDeletePopup.addEventListener("click", function () {
        photoDeleteConfirmationPopup.style.display = 'none'; // Fecha o pop-up
    });
});











