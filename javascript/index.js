// Check if the folder structure exists in localStorage; if not, initialize it
if (!localStorage.getItem('fileSystem')) {
    const initialStructure = [
        {
        "name": "Viagens",
            "folders": [{
                "name": "Londres",
                "folders": [],
                "photos": []
            },
            {
                "name": "Madrid",
                "folders": [],
                "photos": []
            }],
            "photos": []
        },
        {
            "name": "Comida",
                "folders": [],
                "photos": ["fotos-de-paris/croissant.jpg"]
        },
        {
            "name": "Familia",
                "folders": [],
                "photos": []
        },
        {
            "name":"Casamento",
            "folders": [{
                "name": "Igreja",
                "folders": [],
                "photos": [
                    "subconjuntos/Igreja/2.jpg",
                    "subconjuntos/Igreja/4.jpg",
                    "subconjuntos/Igreja/6.jpg",
                    "subconjuntos/Igreja/7.jpg",
                    "subconjuntos/Igreja/12.jpg",
                    "subconjuntos/Igreja/14.jpg",
                    "subconjuntos/Igreja/17.jpg",
                    "subconjuntos/Igreja/18.jpg",
                    "subconjuntos/Igreja/22.jpg",
                    "subconjuntos/Igreja/23.jpg",
                    "subconjuntos/Igreja/24.jpg",
                    "subconjuntos/Igreja/25.jpg"
                ]
            },
            {
                "name": "Jardim",
                "folders": [],
                "photos": [
                    "subconjuntos/Jardim/1.jpg",
                    "subconjuntos/Jardim/3.jpg",
                    "subconjuntos/Jardim/5.jpg",
                    "subconjuntos/Jardim/10.jpg",
                    "subconjuntos/Jardim/13.jpg",
                    "subconjuntos/Jardim/15.jpg",
                    "subconjuntos/Jardim/16.jpg",
                    "subconjuntos/Jardim/19.jpg",
                    "subconjuntos/Jardim/26.jpg",
                    "subconjuntos/Jardim/27.jpg",
                    "subconjuntos/Jardim/28.jpg",
                    "subconjuntos/Jardim/29.jpg",
                    "subconjuntos/Jardim/30.jpg",
                    "subconjuntos/Jardim/31.jpg",
                    "subconjuntos/Jardim/32.jpg"
                ]
            }],
            "photos": []
        }
    ];
    localStorage.setItem('fileSystem', JSON.stringify(initialStructure));
}
let folderPath = []
let lastFolder = JSON.parse(localStorage.getItem('fileSystem'))
// Function to render the current folder based on the folder path
function renderCurrentFolder() {
    console.log('Rendering folder for path:', folderPath);
    let currentPhotos = lastFolder.photos;
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem'))
    let currentFolder = fileSystem;
    
    // Update back button visibility
    updateBackButtonVisibility();

    // Traverse the file path to the target folder
    folderPath.forEach(folderName => {
        const folder = currentFolder.find(f => f.name === folderName);
        if (folder) {
            currentPhotos = folder.photos; // Update photos
            currentFolder = folder.folders; // Update currentFolder to the next level
        } else {
            console.error(`Folder ${folderName} not found at this level.`);
        }
    });

    // Continue with rendering logic
    updateTopBar(folderPath);

    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = ''; // Clear previous content

    // Create and append "Add Folder" button
    const createAlbumDiv = document.createElement('div');
    createAlbumDiv.innerHTML = `<div class="openPopup"><img src="Images/plus.png"><br><label>Criar Álbum</label></div>`;
    createAlbumDiv.addEventListener('click', () => {
        createAlbumPopUp(folderPath);
    });
    contentDiv.appendChild(createAlbumDiv);

    // Render folders and photos
    currentFolder.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.innerHTML = `<img src="Images/folder.png"><br><label>${folder.name}</label>`;
        folderElement.addEventListener('click', () => {
            folderPath.push(folder.name);
            renderCurrentFolder(folderPath);
        });
        contentDiv.appendChild(folderElement);
    });
    if(currentPhotos     !== undefined){
    currentPhotos.forEach(photo => {
        const photoName = photo.split('/').pop();
        const photoElement = document.createElement('div');
        photoElement.innerHTML = `<img src="${photo}"><br><label>${photoName}</label>`;
        photoElement.addEventListener("click", openPhoto)
        contentDiv.appendChild(photoElement);
    })};
    localStorage.setItem("folderPath",JSON.stringify(folderPath))
}

// Function to update the visibility of the back button
function updateBackButtonVisibility() {
    if (folderPath.length === 0) {
        backButton.style.display = "none"; // Hide the back button at root level
    } else {
        backButton.style.display = "block"; // Show the back button if not at root
    }
}

// Function to go back in the folder path
function goBack() {

    if (folderPath.length > 0) {
            folderPath.pop(); // Remove the last folder from the path
            renderCurrentFolder(folderPath); // Re-render the current folder
            if (document.getElementById("photoView").style.display == "block") {
                    document.getElementById("photoView").style.display = "none";
                    document.getElementById("chat-button").style.display = "block";
            }
        }
}

// function leavePhoto() {
    
// }


// Function to add a photo to the current folder
function addPhoto(photoSrc, folderPath) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
    let currentFolder = fileSystem;

    // Traverse to the target folder
    folderPath.forEach(folder => {
        currentFolder = currentFolder.find(f => f.name === folder).folders;
    });

    // Add the new photo to the current folder
    currentFolder.forEach(folder => {
        if (folder.name === folderPath[folderPath.length - 1]) {
            folder.photos.push(photoSrc);
        }
    });

    // Save the updated file system back to localStorage
    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));

    // Re-render the folder contents to reflect the new photo
    renderCurrentFolder(folderPath);
}

// Function to create a new folder in the current directory
function createFolder(folderName, folderPath) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
    let currentFolder = fileSystem;

    // Traverse to the target folder
    folderPath.forEach(folder => {
        currentFolder = currentFolder.find(f => f.name === folder).folders;
    });

    // Add the new folder to the current folder
    currentFolder.push({
        name: folderName,
        folders: [],
        photos: []
    });

    // Save the updated file system back to localStorage
    // Salve a estrutura atualizada
    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));

    // Re-render the folder contents to reflect the new folder
    // Adicione o log para depuração
    console.log('Folder created:', folderName);
    console.log('Updated file system:', JSON.stringify(fileSystem));
    // Re-renderize a estrutura
    renderCurrentFolder(folderPath);
}

// Function to create a popup for adding a new album (folder)
function createAlbumPopUp(folderPath) {
    // Display the popup and initialize button state
    document.getElementById("popup").style.display = "block";
    document.getElementById("okButton").disabled = true;

    // Enable the OK button only when there’s input
    document.getElementById("nameInput").addEventListener("input", function () {
        document.getElementById("okButton").disabled = !this.value; // Enable or disable the OK button based on input
    });

    // OK button click event to create a new folder
    document.getElementById("okButton").onclick = function() {
        const NameAlbum = document.getElementById("nameInput").value; // Get the folder name from input
        document.getElementById("popup").style.display = "none"; // Hide the popup
        document.getElementById("nameInput").value = ''; // Clear the input field
        createFolder(NameAlbum, folderPath); // Create the new folder
    };
    document.getElementById("closePopup").onclick = function(){
        document.getElementById("popup").style.display = "none";   
    }
}

// Function to update the top bar with the clickable folder path, with "Memento Gallery" as the root
function updateTopBar(folderPath) {
    const topBar = document.querySelector('.top_bar span');
    topBar.innerHTML = ''; // Clear existing top bar contents

    // Add "Memento Gallery" as the root link
    const rootLink = document.createElement('span');
    rootLink.textContent = 'Memento Gallery';
    rootLink.style.cursor = 'pointer';
    rootLink.style.marginRight = '5px';
    rootLink.style.textDecoration = 'underline';

    // Handle click event for "Memento Gallery" to reset to the root folder
    rootLink.addEventListener('click', () => {
        navigateToFolder(['root']); // When "Memento Gallery" is clicked, go back to root
    });

    topBar.appendChild(rootLink);
    if(folderPath == null){
        folderPath = []
    }
    // Add "/" separator after "Memento Gallery" if there are subfolders
    if (folderPath.length > 0) {
        const separator = document.createElement('span');
        separator.textContent = '/ ';
        topBar.appendChild(separator);
    }

    // Iterate over the folder path and add the rest of the folder names
    folderPath.forEach((folder, index) => {
        const folderLink = document.createElement('span');
        folderLink.textContent = folder;
        folderLink.style.textDecoration = 'underline';
        folderLink.style.cursor = 'pointer';
        folderLink.style.marginRight = '5px';

        // Add click event to navigate back to this folder
        folderLink.addEventListener('click', () => {
            const newPath = folderPath.slice(0, index + 1); // Get the path up to this folder
            navigateToFolder(['root', ...newPath]); // Navigate back to this folder
        });

        topBar.appendChild(folderLink);

        // Add "/" separator after each folder, except the last one
        if (index < folderPath.length - 1) {
            const separator = document.createElement('span');
            separator.textContent = '/ ';
            topBar.appendChild(separator);
        }
    });
}

// Function to simulate navigating to a folder
function navigateToFolder(newPath) {
    folderPath = newPath.slice(1); // Exclude 'root' when updating folderPath
    renderCurrentFolder(folderPath); // Render folder contents for the new path
    updateTopBar(folderPath); // Update the top bar, excluding the 'root'
}



//Make photo details appear
function openPhoto(){
    document.getElementById("photoView").style.display = "block";
    document.getElementById("chat-button").style.display = "none";
}

function closePhoto(){
    document.getElementById("photoView").style.display = "none";
    document.getElementById("chat-button").style.display = "block";
}

// Main function to initialize the application
window.addEventListener("load", main);
function main() {
    const currentPath = []; // Start with an empty path (root level)
    renderCurrentFolder(currentPath); // Render the initial folder structure
    updateTopBar()
    initializeEventListeners()
    compartilhar()
}

//EventListeners
function initializeEventListeners(){
    backButton.addEventListener('click', goBack);
        document.getElementById("sair").addEventListener("click", function () {
        document.getElementById("photoView").style.display = "none";
        document.getElementById("chat-button").style.display = "block";
    })
    document.getElementById("sharePhotoBut").addEventListener("click",function () {
        document.getElementById("sharePopup").style.display = "block";
    } )
        
}
    


//
function compartilhar(){

    document.getElementById("share").onclick = function(){
        document.getElementById("sharePopup").style.display = "block";
    }
    document.getElementById("closePopupshare").onclick = function(){
        document.getElementById("sharePopup").style.display = "none";
    }
    document.getElementById("MemmentoChats").onclick = function(){
        document.getElementById("MChats").style.display = "block";
        document.getElementById("sharePopup").style.display = "none";
    }
    document.getElementById("closePopupMChats").onclick = function(){
        document.getElementById("MChats").style.display = "none";
    }
    document.getElementById("btn-back-mc").onclick = function(){
        document.getElementById("MChats").style.display = "none";
        document.getElementById("sharePopup").style.display = "block";
    }
}

//Delete Photo

// document.addEventListener("DOMContentLoaded", function () {
//     const deletePhotoButton = document.getElementById("deletePhotoButton");
//     const confirmationPopup = document.getElementById("confirmationPopup");
//     const confirmDelete = document.getElementById("confirmDeleteButton");
//     const cancelDelete = document.getElementById("cancelDeleteButton");

//     // Evento para abrir o pop-up
//     deletePhotoButton.addEventListener("click", function () {
//         confirmationPopup.style.display = "flex";
//     });

//     // Evento para confirmar a exclusão
//     confirmDelete.addEventListener("click", function () {
//         const selectedPhoto = document.querySelector(".photo-container img");
//         if (!selectedPhoto) {
//             alert("Nenhuma foto selecionada.");
//             confirmationPopup.style.display = "none";
//             return;
//         }

//         const fileName = selectedPhoto.getAttribute("data-filename");
//         const folderPath = JSON.parse(selectedPhoto.getAttribute("data-folderpath"));

//         // Eliminar a foto usando a função deletePhoto
//         deletePhoto(folderPath, fileName);

//         // Remover foto da interface
//         selectedPhoto.remove();

//         // Fechar o pop-up
//         confirmationPopup.style.display = "none";
//         alert("Foto eliminada com sucesso.");
//     });

//     // Evento para cancelar a exclusão
//     cancelDelete.addEventListener("click", function () {
//         confirmationPopup.style.display = "none";
//     });
// });
