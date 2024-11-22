"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");
const FRIEND_POPUP = "add-friend-popup";

const SAVEDCHAT = "savedchat";

let chat = {
   "Rafa": [["Olá amor, como correu a reunião? Ouvi dizer que foste promovido", "self"], 
        ["Sim, foi fantastico", "other"],
        ["Parabens <3", "self"]
   ],
   "Lúcia": [["Boas pessoal","other"],["Olá mãe", "self"]],
   "Família": [["Alo Malta","other", "Lúcia"],["Olá familia", "self", "Eu"],
        ["Receberam esta msg?","other", "Lúcia"], ["Sim","other", "Salomé"], ["Same", "self", "Eu"]]
}

function main() {
    localStorage.setItem(SAVEDCHAT, JSON.stringify(chat));
    localStorage.setItem("test", JSON.stringify(chat))
    startOnline();
    startChat("Rafa");
    setEventListeners();
    removeUser();
    // OHCHAT();
}

function setEventListeners(){
    document.getElementById("concluido").disabled = true;

    document.getElementById("send-message").addEventListener("click", () => saveMessage());
    document.getElementById("add-friend").addEventListener("click", () => visibility_on(FRIEND_POPUP));
    document.getElementById("close-popup").addEventListener("click", () => visibility_off(FRIEND_POPUP));
    document.getElementById("add-group").addEventListener("click", () => visibility_on("addGroup-div"));
    document.getElementById("voltar").addEventListener("click", () => visibility_off("addGroup-div"));

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

function startOnline() {
    for (let key in chat) {
        if (chat[key][0].length == 2) {
           addRecents(key, "single");
           document.getElementById("amigos").innerHTML += "<option>" + key + "</option>";
        } else {
            addRecents(key, "group");
        }
    }
}


function startChat(person) {
    localStorage.setItem(SAVEDCHAT, JSON.stringify(chat))
    document.getElementById("chat-text").innerHTML = "<br>";
    document.getElementById("chatName").innerHTML = person;
    for (let i = 0; i < chat[person].length; i++) {
        addChatTxt(chat[person][i]);
    }
    chatScroll("auto");
}

function getChat() {
    return JSON.parse(localStorage.getItem(SAVEDCHAT)) || [];
}

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


function saveMessage() {
    let message = getNewMessage();
    if (message != "") {
        let all_chat = getChat();
        let person = getPerson();
        console.log(person);
        all_chat[person].push([message, "self"]);
        addChatTxt([message, "self"]);
        chatScroll("smooth");
        clearText();
        document.getElementById('new-message').focus();
        localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));
    }
}

function addChatTxt (message) {
    document.getElementById("chat-text").innerHTML += 
                "<p class='" + message[1] + "'>" + message[0] + "</p>";
}

function addRecents(key, type) {
    if (type == "single") {
        document.getElementById("recentChat").innerHTML +=
            "<li><img src='Images/user-icon.png'><label >" + key + "</label></li>";
    } else {
        document.getElementById("recentChat").innerHTML +=
            "<li><img src='Images/group.png'><label >" + key + "</label></li>";
    }
    }

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

function addUserGroup(userID) {
    let username = document.getElementById(userID).value;
    document.getElementById("usersAdded").innerHTML +=
        "<tr><td>" + username + "</td><td class='remove'> X </td></tr>";
        removeUser();
}

function removeUser () {
    document.querySelectorAll('.remove').forEach(function (cell) {
        cell.addEventListener('click', function () {
            const row = this.parentElement; 
            row.remove(); 
        });
    });
}
