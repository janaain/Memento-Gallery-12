"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");
const FRIEND_POPUP = "add-friend-popup";

const SAVEDCHAT = "savedchat";

let chat = [];

function main() {
    startChat();
    setEventListeners();

    document.querySelectorAll('.content').forEach(element => {
        element.classList.remove('content div');
    });
}

function setEventListeners(){
    document.getElementById("add-friend").addEventListener("click", () => visibility_on(FRIEND_POPUP));
    document.getElementById("close-popup").addEventListener("click", () => visibility_off(FRIEND_POPUP));
}

window.addEventListener("load", main);
// -----------------------------------------------------------------

function visibility_on(id) {
    document.getElementById(id).classList.add("on");
}

function visibility_off(id) {
    document.getElementById(id).classList.remove("on");
}

function startChat() {
    localStorage.setItem(SAVEDCHAT, JSON.stringify(chat))
}

function getNewMessage() {
    let msg = document.getElementById("new-message").value;
    return msg;
}

function saveMessage() {
    let message = getNewMessage();
    let all_chat = JSON.parse(localStorage.getItem(SAVEDCHAT));
    all_chat.push(message);
    addChatTxt(message)
    localStorage.setItem(SAVEDCHAT, JSON.stringify(all_chat));
}

function addChatTxt (message) {
    document.getElementById("chat-text").innerHTML += 
                "<p class='self'>" + message + "</p>";
}

// function chatScroll() {
//     const chatText = document.querySelector('.chat-text');
//     chatText.scrollTop = chatText.scrollHeight; // Coloca o scroll no final
// }