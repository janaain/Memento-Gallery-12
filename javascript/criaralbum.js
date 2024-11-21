// Function to create a popup for adding a new album (folder)
function addPhotosPopUp(folderPath) {
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