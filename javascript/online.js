"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");
const FRIEND_POPUP = "add-friend-popup";

const SAVEDCHAT = "savedchat";

let chat = {
   "Rafa": [["Olá amor, como correu a reunião? Ouvi dizer que foste promovido", "self"], 
        ["Sim, foi fantastico", "other"],
        ["Parabens <3", "self"]
   ]
}

function main() {
    localStorage.setItem(SAVEDCHAT, JSON.stringify(chat))
    localStorage.setItem("test", JSON.stringify(chat))
    startChat("Rafa");
    setEventListeners();
}

function setEventListeners(){
    document.getElementById("send-message").addEventListener("click", () => saveMessage());
    document.getElementById("add-friend").addEventListener("click", () => visibility_on(FRIEND_POPUP));
    document.getElementById("close-popup").addEventListener("click", () => visibility_off(FRIEND_POPUP));
    
    document.addEventListener('keydown', function(event) {

    if (event.key === "Enter") {
        event.preventDefault(); // Evita comportamento padrão (ex: enviar formulário)
        document.getElementById("send-message").click(); // Simula o clique no botão
    }});
}

window.addEventListener("load", main);
// -----------------------------------------------------------------

function visibility_on(id) {
    document.getElementById(id).classList.add("on");
}

function visibility_off(id) {
    document.getElementById(id).classList.remove("on");
}


function startChat(person) {
    localStorage.setItem(SAVEDCHAT, JSON.stringify(chat))
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
    return "Rafa";
}

function saveMessage() {
    let message = getNewMessage();
    if (message != "") {
        let all_chat = getChat();
        let person = getPerson();
        console.log(all_chat)
        console.log([message, "self"])
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
