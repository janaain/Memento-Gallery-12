// Check if the folder structure exists in localStorage; if not, initialize it
if (!localStorage.getItem('fileSystem')) {
    const initialStructure = [
        {
            "name": "Londres",
            "folders": [],
            "photos": ["fotos-de-paris/croissant.jpg"]
        }
    ];
    localStorage.setItem('fileSystem', JSON.stringify(initialStructure));
}

// Function to render the current folder based on the folder path
function renderCurrentFolder(folderPath) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
    let currentFolder = fileSystem;

    // Traverse the file path to the target folder
    folderPath.forEach(folderName => {
        currentFolder = currentFolder.find(f => f.name === folderName).folders;
    });

    // Update folder path on top bar
    updateTopBar(folderPath)

    // Clear the content area for new rendering
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = '';

    // Create and append "Add Folder" button
    const createAlbumDiv = document.createElement('div');
    createAlbumDiv.innerHTML = `<div class="openPopup"><img src="Images/plus.png"><br><label>Criar Albúm</label></div>`;
    createAlbumDiv.addEventListener('click', () => {
        createAlbumPopUp(folderPath); // Open the popup to create a new folder
    });
    contentDiv.appendChild(createAlbumDiv);

    // Display folders in the current directory
    currentFolder.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.innerHTML = `<img src="Images/folder.png"><br><label>${folder.name}</label>`;
        
        // Add click event to open the folder
        folderElement.addEventListener('click', () => {
            folderPath.push(folder.name);
            renderCurrentFolder(folderPath); // Render the contents of the new folder
        });
    
        contentDiv.appendChild(folderElement);
    });

    // Display photos in the current folder
    currentFolder.forEach(folder => {
        folder.photos.forEach(photo => {
            const photoName = photo.split('/').pop();
            const photoElement = document.createElement('div');
            photoElement.innerHTML = `<img src="${photo}"><br><label>${photoName}</label>`;
            photoElement.addEventListener('click', openPhoto)
            contentDiv.appendChild(photoElement);
        });
    });
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
    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));

    // Re-render the folder contents to reflect the new folder
    renderCurrentFolder(folderPath);
}

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
    document.getElementById("sair").addEventListener("click", function () {
    document.getElementById("photoView").style.display = "none";
    document.getElementById("chat-button").style.display = "block";
})
}

//
function compartilhar(){
    document.getElementById("share").onclick = function(){
        document.getElementById("sharePopup").style.display = "block";
    }
    document.getElementById("closePopupshare").onclick = function(){
        document.getElementById("sharePopup").style.display = "none";
    }
}