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


// document.querySelectorAll('.remove-tag-button').addEventListener("click", function() {
//     let selectedTag = this.parentElement;
//     console.log("ola")
//     document.getElementById("TagPopup").style.display = "block"
//     document.getElementById("confirmRemove").addEventListener("click", function() {
//         selectedTag.remove();
//     })
// })


/* Tags */
document.addEventListener("DOMContentLoaded", function () {
    const addTagOption = document.getElementById("addTagOption");
    const tagContainer = document.getElementById("tagContainer");


    const tagPopup = document.getElementById("TagPopup");
    const confirmButton = document.querySelector(".popup-content .confirm");
    const cancelButton = document.querySelector(".popup-content .cancel");

    let tagToRemove = null; // Referência à tag a ser removida

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

        // Função para fixar a tag
        function fixTag() {
            const inputValue = newTagInput.value.trim();
            if (inputValue !== "") {
                // Criar o conteúdo da tag fixa
                const tagContent = document.createElement("span");
                tagContent.className = "tag-content";
                tagContent.textContent = inputValue;

                newTagWrapper.innerHTML = ""; // Limpar o wrapper atual
                newTagWrapper.appendChild(tagContent);
                newTagWrapper.appendChild(deleteButton); // Adicionar novamente o botão de remoção
            }
        }

        // Fixar a tag ao pressionar Enter
        newTagInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                fixTag();
            }
        });

        // Fixar a tag ao sair do campo de texto
        newTagInput.addEventListener("blur", fixTag);

        // Remover a tag ao clicar no botão
        deleteButton.addEventListener("click", function () {
            tagToRemove = newTagWrapper; // Armazena a tag para remoção
            tagPopup.style.display = "flex"; // Exibe o pop-up
        });
    });

    // Confirmação de remoção
    confirmButton.addEventListener("click", function () {
        if (tagToRemove) {
            tagContainer.removeChild(tagToRemove); // Remove a tag
            tagToRemove = null; // Reseta a referência
        }
        tagPopup.style.display = "none"; // Esconde o pop-up
    });

    // Cancelamento de remoção
    cancelButton.addEventListener("click", function () {
        tagToRemove = null; // Reseta a referência
        tagPopup.style.display = "none"; // Esconde o pop-up
    });
});

/*Remove photo */

document.addEventListener("DOMContentLoaded", function () {
    const deletePhotoButton = document.getElementById("deletePhotoButton"); // Botão para excluir foto
    const photoDeletePopup = document.getElementById("photoDeleteConfirmationPopup"); // Pop-up
    const confirmDeleteButton = photoDeletePopup.querySelector(".confirm");
    const cancelDeleteButton = photoDeletePopup.querySelector(".cancel");
    const photoElement = document.getElementById("photoElement"); // Elemento da foto
    const mainDiv = document.querySelector(".main"); // Div do início da página

    // Mostrar o pop-up ao clicar no botão de excluir foto
    deletePhotoButton.addEventListener("click", function () {
        photoDeletePopup.style.display = "flex"; // Exibir o pop-up
    });

    // Confirmar exclusão da foto
    confirmDeleteButton.addEventListener("click", function () {
        if (photoElement) {
            photoElement.remove(); // Remove a foto do DOM
        }
        photoDeletePopup.style.display = "none"; // Esconder o pop-up
        window.scrollTo({ top: 0, behavior: "smooth" }); // Voltar ao início da página
    });

    // Cancelar exclusão da foto
    cancelDeleteButton.addEventListener("click", function () {
        photoDeletePopup.style.display = "none"; // Esconder o pop-up
    });
});













