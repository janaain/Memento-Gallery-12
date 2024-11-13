"use strict";

// CONSTANTS ----------------------------------------------------------

// const GET_FRIEND_BUTTON = document.getElementById("add-friend");
const FRIEND_POPUP = "add-friend-popup";


function main() {
    setEventListeners();
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

1
0