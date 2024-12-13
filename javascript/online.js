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

   "Família": [["Somos uma família muito feliz",["Lúcia", "Salomé", "Luís"],0], ["Alo Malta","other", "Lúcia"],["Olá familia", "self", "Eu"],
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
    checkInput()
}

function setEventListeners(){
    document.getElementById("concluido").disabled = true;
    document.getElementById("photoView").style.display = "none"

    document.getElementById("send-message").addEventListener("click", () => saveMessage());
    document.getElementById("add-friend").addEventListener("click", () => visibility_on("add-friend-popup"));
    document.getElementById("closePopup").addEventListener("click", () => visibility_off("add-friend-popup"));
    document.getElementById("add-group").addEventListener("click", function() {
        visibility_on("addGroup-div");
        visibility_off("sharedAlbum-div");
        visibility_off("groupInfo-div");
        closePhoto();
    });
    document.getElementById("concluido").addEventListener("click", () => createGroup());
    document.getElementById("voltar").addEventListener("click", () => visibility_off("addGroup-div"));
    document.getElementById("verAlbum").addEventListener("click", () =>visibility_on("sharedAlbum-div"));
    document.getElementById("verAlbum").addEventListener("click", function() {
        if (isGroup()) {
            fiches();
        } else {
            notFiches();
        }
        
    });
    document.getElementById("verChat").addEventListener("click", () =>visibility_off("sharedAlbum-div"));

    document.getElementById("okButton").addEventListener("click", () => addFriend());
    document.getElementById("nameInput").addEventListener("input", () => checkInput());
    document.getElementById("backButton").addEventListener('click', goBack);
    document.getElementById("backChat").addEventListener("click", () => visibility_off("groupInfo-div"))

    document.getElementById("albmName").addEventListener("input", () => checkInput());
    document.getElementById("okUser").addEventListener("click", function () {
        addUserGroup("username");
        document.getElementById("username").value = ""
        checkInput();
    } );
    document.getElementById("username").addEventListener("input",  checkInput);

    document.getElementById("okFriend").addEventListener("click", function () {
        addUserGroup("amigos");
        checkInput()}
    )
    
    document.getElementById('recentChat').addEventListener('click', function(event) {
        let li = event.target.closest('li');    
        if (li) {
            startChat(li.textContent.trim()); 
            visibility_off("sharedAlbum-div");
            visibility_off("addGroup-div");
            visibility_off("groupInfo-div");
            closePhoto();
        }
        })
    
    document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
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
      
    

    // POR IMPLMENTAR

    document.getElementById("changeGroupName").addEventListener("click", () => alert());
    document.getElementById("changeGroupDetails").addEventListener("click", () => alert());
    document.getElementById("changeGroupUsers").addEventListener("click", () => alert());

}

window.addEventListener("load", main);
// -----------------------------------------------------------------

function visibility_on(id) {
    document.getElementById(id).classList.add("on");
}

function visibility_off(id) {
    document.getElementById(id).classList.remove("on");
}

function notDone() {
    alert("por implementar");
}

// Adds the current friends to the dropdown on "Criar Grupo"
function startOnline() {
    let all_chat = getChat()
    document.getElementById("amigos").innerHTML = "";
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
    // visibility_off("sharedAlbum-div");
    let all_chat = JSON.parse(localStorage.getItem(SAVEDCHAT));
    document.getElementById("chat-text").innerHTML = "<br>";
    document.getElementById("chat-info").innerHTML = "<img id='personImage' src='Images/user-icon.png'>" +
                    "<span id='chatName'></span>"; 
    document.getElementById("chatName").innerHTML = person;
    if (isGroup()) {
        document.getElementById("chat-info").innerHTML += "<button id='seeGroupInfo'>Detalhes</button>";
        document.getElementById("personImage").src = "Images/group.png";
        // document.getElementById("chat-info").innerHTML += "<img src='Images/plus.png'>";-
    }
    document.getElementById("chat-info").innerHTML += "<button id='verAlbum'>Ver Album Partilhado</button>"
                
    for (let i = 1; i < all_chat[person].length; i++) {
        addChatTxt(all_chat[person][i]);
    }
    if (isGroup()) {
        document.getElementById("seeGroupInfo").addEventListener("click", () => showGroupInfo(person));
    }
    document.getElementById("verAlbum").addEventListener("click", () =>visibility_on("sharedAlbum-div"));
    document.getElementById("verAlbum").addEventListener("click", function() {
        if (isGroup()) {
            fiches();
        } else {
            notFiches();
        }
        
    });
    chatScroll("auto");
}

function getChat() {
    return JSON.parse(localStorage.getItem(SAVEDCHAT)) || [];
}

function getOtherPerson() {
    return getChat()[getPerson()][0][1][0];
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

function isGroup() {
    let all_chat = getChat();
    if (all_chat[getPerson()][0].length == 3) {
        return true;
    }
    return false;
}

// Saves new message and prints it in the chat
function saveMessage() {
    let message = getNewMessage();
    if (message != "") {
        let all_chat = getChat();
        let person = getPerson();

        if (isGroup()){
            all_chat[person].push([message, "self","Eu"]);
            addChatTxt([message, "self", "Eu"]);
            addChatTxt(["Ok", "other", getOtherPerson()]);
        } else {
            all_chat[person].push([message, "self"]);
            addChatTxt([message, "self"]);
            addChatTxt(["Ok", "other"])
        }
        

        chatScroll("smooth");
        clearText();

        document.getElementById('new-message').focus();
        localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));
    }
}

// Code HTML that prints a message
// message has the following format [message, class, 'sender']
function addChatTxt (message) {
    if (isGroup() && message[2] != "Eu") {
        document.getElementById("chat-text").innerHTML += 
                "<p class='" + message[1] + "'><span class='chat-pessoa'>"+ message[2] +"</span><br>" + message[0] + "</p>";
    } else {
        document.getElementById("chat-text").innerHTML += 
                "<p class='" + message[1] + "'>" + message[0] + "</p>";
    }
    
}

// Appends the existing chats in the side bar
function addRecents(key, type) {
    let temp = document.getElementById("recentChat").innerHTML;
    if (type == "single") {
        document.getElementById("recentChat").innerHTML =
            "<li><img src='Images/user-icon.png'><label>" + key + "</label></li>";
    } else {
        document.getElementById("recentChat").innerHTML =
            "<li><img src='Images/group.png'><label>" + key + "</label></li>";
    }
    document.getElementById("recentChat").innerHTML += temp;

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

// Ativates/Deativates the buttons according to inputs
function checkInput() {
    let nome = document.getElementById("albmName").value;
    let usersAdded = document.getElementById("usersAdded").rows.length;
    let addUserToGroup = document.getElementById("username").value;
    let newFriend = document.getElementById("nameInput").value;

    //
    if (nome != "" && usersAdded > 0){
        document.getElementById("concluido").disabled = false;
    } else if (nome == "" || usersAdded == 0){
        document.getElementById("concluido").disabled = true;
    }

    if(addUserToGroup == "") {
        document.getElementById("okUser").disabled = true;
    } else if(addUserToGroup != "") {
        document.getElementById("okUser").disabled = false;
    }

    if(newFriend == "") {
        document.getElementById("okButton").disabled = true;
    } else {
        document.getElementById("okButton").disabled = false;
    }
    
}


// Adds a user to the list of the "users para adicionar" to the new group chat
function addUserGroup(userID) {
    let username = document.getElementById(userID).value;
    document.getElementById("usersAdded").innerHTML +=
        "<tr><td>" + username + "</td><td class='remove'> X </td></tr>";
        removeUser();
    document.getElementById("username").value = "";
}

//Removes a user of the list of the "users para adicionar" to the new group chat
function removeUser () {
    document.querySelectorAll('.remove').forEach(function (cell) {
        cell.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });
}


function createGroup() {
    let name = document.getElementById("albmName").value;
    let details = document.getElementById("details").value;
    let numUser = document.getElementById("usersAdded").rows.length;
    let users = [];

    for(let i = 0; i < numUser; i++) {
        users.push(document.getElementById("usersAdded").rows[i].cells[0].innerHTML)
    }
    

    let all_chat = getChat();
    all_chat[name] = [[details, users, 0]];
    localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));

    startOnline();
    visibility_off("addGroup-div");

}

function showGroupInfo (name) {
    let info = getChat()[name];
    let details = info[0][0];
    let users = info[0][1];

    document.getElementById("groupName").innerHTML = name;
    document.getElementById("groupDetails").value = details;
    document.getElementById("usersInGroup").innerHTML = "";

    for(let i = 0; i < users.length; i++) {
        document.getElementById("usersInGroup").innerHTML +=
            "<tr><td>" + users[i] + "</td><td class='remove'> X </td></tr>";
        removeUser();
        visibility_on("groupInfo-div")
    }

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
    contentDiv.innerHTML += "<div><img src='Images/plus.png'><br><span>Criar Album</span></div>";


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
    document.getElementById("sharedZone").style.display="flex";
}

function fiches() {
    renderCurrentFolder(root); // Render the initial folder structure
    updateTopBar()
}

function notFiches() {
    document.getElementById("sharedZone").innerHTML = "";
    document.getElementById("sharedZone").innerHTML += "<div><img src='Images/plus.png'><br><span>Criar Album</span></div>";
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

