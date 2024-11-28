"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");

const SAVEDCHAT = "savedchat";

let chat = {
   "Rafa": [[0,0],["Olá amor, como correu a reunião? Ouvi dizer que foste promovido", "self"], 
        ["Sim, foi fantastico", "other"],
        ["Parabens <3", "self"]
   ],
   "Lúcia": [[0,0],["Boas filho","other"],["Olá mãe", "self"], ["<img src='subconjuntos/Igreja/2.jpg'>", "self"]],

   "Família": [[0,0,0],["Alo Malta","other", "Lúcia"],["Olá familia", "self", "Eu"],
        ["Receberam esta msg?","other", "Lúcia"], ["Sim","other", "Salomé"], ["Same", "self", "Eu"]]
}

let shared = {"Jardim":["subconjuntos/Jardim"], "Igreja":["subconjuntos/Igreja"]}

function main() {
    let temp = JSON.parse(localStorage.getItem(SAVEDCHAT)) || "";
    if (temp == "") {
       localStorage.setItem(SAVEDCHAT, JSON.stringify(chat));
    }

    startOnline();
    startChat("Rafa");
    setEventListeners();
    removeUser();
    compartilhar();
}

function setEventListeners(){
    document.getElementById("concluido").disabled = true;
    document.getElementById("photoView").style.display = "none"

    document.getElementById("send-message").addEventListener("click", () => saveMessage());
    document.getElementById("add-friend").addEventListener("click", () => visibility_on("add-friend-popup"));
    document.getElementById("closePopup").addEventListener("click", () => visibility_off("add-friend-popup"));
    document.getElementById("add-group").addEventListener("click", () => visibility_on("addGroup-div"));
    document.getElementById("concluido").addEventListener("click", () => createGroup());
    document.getElementById("voltar").addEventListener("click", () => visibility_off("addGroup-div"));
    document.getElementById("verAlbum").addEventListener("click", () =>visibility_on("sharedAlbum-div"));
    document.getElementById("verAlbum").addEventListener("click", () =>fiches());
    document.getElementById("verChat").addEventListener("click", () =>visibility_off("sharedAlbum-div"));
    

    document.getElementById("okButton").addEventListener("click", () => addFriend());
    document.getElementById("backButton").addEventListener('click', goBack);

    document.getElementById("albmName").addEventListener("input", () => checkInput());
    document.getElementById("okUser").addEventListener("click", function () {
        addUserGroup("username");
        checkInput()}
    )
    document.getElementById("okFriend").addEventListener("click", function () {
        addUserGroup("amigos");
        checkInput()}
    )
    
    document.getElementById('recentChat').addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                startChat(event.target.textContent);
            }
        })
    
    document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita comportamento padrão (ex: enviar formulário)
        // Simula o clique nos botões:
        document.getElementById("send-message").click(); 
        document.getElementById("okUser").click();
    }
    })

    document.getElementById("sharePhotoBut").addEventListener("click",function () {
        document.getElementById("sharePopup").style.display = "block";
    } )

    document.getElementById("closePopup").onclick = function(){
        document.getElementById("popup").style.display = "none";   
    }

    document.getElementById("sair").addEventListener("click", function () {
        document.getElementById("photoView").style.display = "none";
        document.getElementById("chat-button").style.display = "block";
    })
        
}

window.addEventListener("load", main);
// -----------------------------------------------------------------

function visibility_on(id) {
    document.getElementById(id).classList.add("on");
}

function visibility_off(id) {
    document.getElementById(id).classList.remove("on");
}

// Adds the current friends to the dropdown on "Criar Grupo"
function startOnline() {
    let all_chat = getChat()
    document.getElementById("recentChat").innerHTML = "";
    for (let key in all_chat) {
        if (all_chat[key][0].length == 2) {
           addRecents(key, "single");
           document.getElementById("amigos").innerHTML += "<option>" + key + "</option>";
        } else {
            addRecents(key, "group");
        }
    }
}

// Displays the chat with a given person (wich is a key of the array chat)
function startChat(person) {
    let all_chat = JSON.parse(localStorage.getItem(SAVEDCHAT));
    document.getElementById("chat-text").innerHTML = "<br>";
    document.getElementById("chatName").innerHTML = person;
    for (let i = 1; i < all_chat[person].length; i++) {
        addChatTxt(all_chat[person][i]);
    }
    chatScroll("auto");
}


function getChat() {
    return JSON.parse(localStorage.getItem(SAVEDCHAT)) || [];
}

// Clears the text of the input where the new message is inserted
function clearText() {
    document.getElementById("new-message").value = "";
}

function getNewMessage() {
    let msg = document.getElementById("new-message").value;
    return msg;
}

function getPerson() {
    return document.getElementById("chatName").innerHTML;
}

// Saves new message and prints it in the chat
function saveMessage() {
    let message = getNewMessage();
    if (message != "") {
        let all_chat = getChat();
        let person = getPerson();

        all_chat[person].push([message, "self"]);

        addChatTxt([message, "self"]);
        chatScroll("smooth");
        clearText();

        document.getElementById('new-message').focus();
        localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));
    }
}

// Code HTML that prints a message
// message has the following format [message, class, 'sender']
function addChatTxt (message) {
    document.getElementById("chat-text").innerHTML += 
                "<p class='" + message[1] + "'>" + message[0] + "</p>";
}

// Appends the existing chats in the side bar
function addRecents(key, type) {
    if (type == "single") {
        document.getElementById("recentChat").innerHTML +=
            "<li><img src='Images/user-icon.png'><label >" + key + "</label></li>";
    } else {
        document.getElementById("recentChat").innerHTML +=
            "<li><img src='Images/group.png'><label >" + key + "</label></li>";
    }
}

// Configs of scroll
function chatScroll(mode) {
    let container = document.getElementById("chat-div");
    if (mode == "auto"){
        container.scrollTo({ 
            top: container.scrollHeight, 
            behavior: 'auto',
        });
    } else {
        container.scrollTo({ 
            top: container.scrollHeight, 
            behavior: 'smooth',
        });
    }
}

// Ativates/Deativates the "criar (album)" button
function checkInput() {
    let nome = document.getElementById("albmName").value;
    let users = document.getElementById("usersAdded").rows.length;

    if (nome != "" && users > 0){
        document.getElementById("concluido").disabled = false;
    }

    if (nome == "" || users == 0){
        document.getElementById("concluido").disabled = true;
    }
}

// Adds a user to the list of the "users para adicionar" to the new group chat
function addUserGroup(userID) {
    let username = document.getElementById(userID).value;
    document.getElementById("usersAdded").innerHTML +=
        "<tr><td>" + username + "</td><td class='remove'> X </td></tr>";
        removeUser();
}

//Removes a user of the list of the "users para adicionar" to the new group chat
function removeUser () {
    document.querySelectorAll('.remove').forEach(function (cell) {
        cell.addEventListener('click', function () {
            const row = this.parentElement; 
            row.remove(); 
        });
    });
}

function createGroup() {
    let name = document.getElementById("albmName").value;
    let users = document.getElementById("usersAdded").rows.length;

    let all_chat = getChat();
    all_chat[name] = [[0, 0, 0]];
    localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));

    startOnline();
    visibility_off("addGroup-div");

}

function addFriend() {
    let friend = document.getElementById("nameInput").value;

    let all_chat = getChat();
    all_chat[friend] = [[0, 0,]];
    localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));

    document.getElementById("nameInput").value = "";

    startOnline();
    visibility_off("add-friend-popup");
}


// Albuns bem feitos
const root = []; // Start with an empty path (root level)

const casamento = [
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

let lastFolder = casamento
let folderPath = []
// Function to render the current folder based on the folder path
function renderCurrentFolder() {
    console.log('Rendering folder for path:', folderPath);
    let currentPhotos = lastFolder.photos;
    const fileSystem = casamento;
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

    const contentDiv = document.querySelector('#sharedZone');
    contentDiv.innerHTML = ''; // Clear previous content

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
        photoElement.innerHTML = `<img src="${photo}" class="sharedAlbumPhoto"><br><label>${photoName}</label>`;
        contentDiv.appendChild(photoElement);
    })};

    document.querySelectorAll(".sharedAlbumPhoto").forEach(element => {
        element.addEventListener("click", () => {
            openPhoto();
        });
    })

    
}

// Function to update the visibility of the back button
function updateBackButtonVisibility() {
    if (folderPath.length === 0) {
        document.getElementById("backButton").style.display = "none"; // Hide the back button at root level
    } else {
        document.getElementById("backButton").style.display = "block"; // Show the back button if not at root
    }
}

// Function to go back in the folder path
function goBack() {
    if (folderPath.length > 0) {
        folderPath.pop(); // Remove the last folder from the path
        renderCurrentFolder(folderPath); // Re-render the current folder
    }
}

// Function to update the top bar with the clickable folder path, with "Memento Gallery" as the root
function updateTopBar(folderPath) {
    const topBar = document.querySelector('#sharedAlbum-div .chat-info span');
    topBar.innerHTML = ''; // Clear existing top bar contents

    // Add "Memento Gallery" as the root link
    const rootLink = document.createElement('span');
    rootLink.textContent = 'Álbum Conjunto';
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

// Function to create a new folder in the current directory
function createFolder(folderName, photosList, folderPath) {
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
        photos: photosList
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

//Make photo details appear
function openPhoto(){
    // document.getElementById("photoView").classList.remove("invisible");
    document.getElementById("photoView").style.display ="flex";
    visibility_off("sharedZone");
}

function closePhoto(){
    // document.getElementById("photoView").classList.add("invisible");
    document.getElementById("photoView").style.display ="none";
    visibility_on("sharedZone");
}

function fiches() {
    renderCurrentFolder(root); // Render the initial folder structure
    updateTopBar()
}

// -----------------------------------------------------------------------

function compartilhar(){

    document.getElementById("sharePhotoBut").onclick = function(){
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