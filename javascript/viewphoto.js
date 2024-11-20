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
    const addTagOption = document.getElementById("addTagOption");
    const tagContainer = document.getElementById("tagContainer");
    const confirmationPopup = document.getElementById("confirmationPopup");
    const confirmButton = document.getElementById("confirmButton");
    const cancelButton = document.getElementById("cancelButton");
    const closeConfirmationPopup = document.getElementById("closeConfirmationPopup");

    addTagOption.addEventListener("click", function (event) {
        event.preventDefault();

        const newTag = document.createElement("div");
        newTag.className = "action-button user-tag";
        newTag.contentEditable = "true";
        newTag.textContent = "";

        tagContainer.appendChild(newTag);

        newTag.focus();

        newTag.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                confirmationPopup.style.display = 'flex';

                confirmButton.addEventListener("click", function () {
                    confirmationPopup.style.display = 'none';
                });

                cancelButton.addEventListener("click", function () {
                    tagContainer.removeChild(newTag);
                    confirmationPopup.style.display = 'none';
                });

                closeConfirmationPopup.addEventListener("click", function () {
                    confirmationPopup.style.display = 'none';
                });
            }
        });
    });
});





