"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");

const SAVEDCHAT = "savedchat";

let chat = {
   "Rafa": [[0,0],["Olá amor, como correu a reunião? Ouvi dizer que foste promovido", "self"], 
        ["Sim, foi fantastico", "other"],
        ["Parabens <3", "self"]
   ],
   "Lúcia": [[0,0],["Boas pessoal","other"],["Olá mãe", "self"]],
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
    sharedAlbuns();
}

function setEventListeners(){
    document.getElementById("concluido").disabled = true;

    document.getElementById("send-message").addEventListener("click", () => saveMessage());
    document.getElementById("add-friend").addEventListener("click", () => visibility_on("add-friend-popup"));
    document.getElementById("closePopup").addEventListener("click", () => visibility_off("add-friend-popup"));
    document.getElementById("add-group").addEventListener("click", () => visibility_on("addGroup-div"));
    document.getElementById("concluido").addEventListener("click", () => createGroup());
    document.getElementById("voltar").addEventListener("click", () => visibility_off("addGroup-div"));
    document.getElementById("verAlbum").addEventListener("click", () =>visibility_on("sharedAlbum-div"));
    document.getElementById("verChat").addEventListener("click", () =>visibility_off("sharedAlbum-div"));
    document.getElementById("okButton").addEventListener("click", () => addFriend());


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
        });
    
    document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita comportamento padrão (ex: enviar formulário)
        document.getElementById("send-message").click(); // Simula o clique no botão
    }
    });
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


function sharedAlbuns() {
    for (let key in shared) {
        document.getElementById("sharedZone").innerHTML += 
        `<div><img src='Images/folder.png'><br><label>${key}</label></div>`;
    }

}