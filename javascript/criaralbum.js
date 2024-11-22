let current_step = 2
let havePhotos = 0

function next_step(){
    const next = document.getElementById("next");
    current_step = current_step + 1
    console.log(current_step)
    if(current_step == 1){
        document.getElementById("Cphotos").style.display = "flex"
        document.getElementById("Ccriterios").style.display = "none"
        document.getElementById("Crever").style.display = "none"
        document.getElementById("header").replaceWith(header1());
        if(havePhotos == 0){next.disabled = true}  
        document.getElementById("prev").style.display = "none"
        document.getElementById("next").textContent = "Próximo Passo";
    }
    if(current_step == 2){
        document.getElementById("Cphotos").style.display = "none"
        document.getElementById("Ccriterios").style.display = "flex"
        document.getElementById("Crever").style.display = "none"
        document.getElementById("header").replaceWith(header2());
        document.getElementById("prev").style.display = "block"
        document.getElementById("next").textContent = "Próximo Passo";
    }
    if(current_step == 3){
        document.getElementById("Cphotos").style.display = "none"
        document.getElementById("Ccriterios").style.display = "none"
        document.getElementById("Crever").style.display = "flex"
        document.getElementById("header").replaceWith(header3());
        document.getElementById("prev").style.display = "block"
        document.getElementById("next").textContent = "Concluir";
        document.getElementById("next").disabled = true
        fiches()
    }
}

function previous_step(){
    console.log("prev:" + current_step)
    current_step = current_step - 2
    next_step(current_step)
}

function setEventListeners(){
    // Seleciona a div que vai agir como botão e o input de ficheiros
    const addPhotoButton = document.getElementById('addPhotos');
    const fileInput = document.getElementById('fileInput');

    // Adiciona um evento de clique à div
    addPhotoButton.addEventListener('click', () => {
        fileInput.click(); // Dispara o clique no input escondido
    });

    const previous = document.getElementById("prev")
    previous.addEventListener('click', () => {
        previous_step(current_step)
    });

    document.getElementById("album-name").addEventListener("input", function() {
        // Enable the button if the input has text, disable it otherwise
        if (document.getElementById("album-name").value.trim() !== "") {
            document.getElementById("next").disabled = false;
        } else {
            document.getElementById("next").disabled = true;
        }
    });

    const next = document.getElementById("next");
    
    // Mostra as imagens selecionadas
    fileInput.addEventListener('change', (event) => {
        const imagePreview = document.getElementById('Cphotos');
        const next = document.getElementById("next");
        next.disabled = false
        next.addEventListener('click', () => {
            next_step(current_step)
        });
        
        const files = event.target.files;
        havePhotos = 1
        // Itera pelos ficheiros selecionados
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const div = document.createElement('div')
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src); // Liberta memória

                const label = document.createElement('label');
                label.textContent = file.name;

                div.appendChild(img);
                div.appendChild(document.createElement('br'));
                div.appendChild(label);
                div.classList.add("images")
                
                imagePreview.appendChild(div);  
            }
        }
    });
}

window.addEventListener("load", main);

function main() {
    setEventListeners();
    next_step(current_step)
}

function header1(){
    // Cria o contêiner principal (div com a classe 'header')
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');
    headerDiv.id = "header"

    // Cria o parágrafo <p>
    const paragraph = document.createElement('p');
    paragraph.textContent = '1. Importe as Fotos';

    // Adiciona o <p> ao contêiner principal
    headerDiv.appendChild(paragraph);

    // Cria a div da dropdown
    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown');

    // Cria o botão da dropdown (div com a classe 'dropbtn')
    const dropbtn = document.createElement('div');
    dropbtn.classList.add('dropbtn');
    dropbtn.textContent = 'Organizar por:';

    // Adiciona o botão ao dropdown
    dropdownDiv.appendChild(dropbtn);

    // Cria o conteúdo da dropdown (div com a classe 'dropdown-content')
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    // Cria os links dentro da dropdown
    const link1 = document.createElement('a');
    link1.href = '#option1';
    link1.textContent = 'A-Z';

    const link2 = document.createElement('a');
    link2.href = '#option2';
    link2.textContent = 'Z-A';

    const link3 = document.createElement('a');
    link3.href = '#option3';
    link3.textContent = 'Data';

    // Adiciona os links ao conteúdo da dropdown
    dropdownContent.appendChild(link1);
    dropdownContent.appendChild(link2);
    dropdownContent.appendChild(link3);

    // Adiciona o conteúdo da dropdown à div dropdown
    dropdownDiv.appendChild(dropdownContent);

    // Adiciona a div dropdown ao contêiner principal (header)
    headerDiv.appendChild(dropdownDiv);

    return headerDiv
}

function header2(){
    // Cria o contêiner principal (div com a classe 'header')
const headerDiv = document.createElement('div');
headerDiv.classList.add('header');
headerDiv.id = "header"

// Cria o parágrafo <p>
const paragraph = document.createElement('p');
paragraph.textContent = '2. Selecione os critérios para criar as subcoleções.';

// Adiciona o <p> ao contêiner principal
headerDiv.appendChild(paragraph);

return(headerDiv)
}

function header3(){
    // Cria o contêiner principal (div com a classe 'header')
const headerDiv = document.createElement('div');
headerDiv.classList.add('header');
headerDiv.id = "header"

// Cria o parágrafo <p>
const paragraph = document.createElement('p');
paragraph.textContent = '3. Reveja o resultado final do seu álbum.';

// Adiciona o <p> ao contêiner principal
headerDiv.appendChild(paragraph);

return(headerDiv)
}






const root = []; // Start with an empty path (root level)

const paris = [
    {
        "name": "11-04-2004",
        "folders": [],
        "photos": [
            "subconjuntos/11-04-2004/ArcTriunfe.jpeg",
            "subconjuntos/11-04-2004/Louvre.jpeg",
            "subconjuntos/11-04-2004/Notre-Dame.jpeg",
            "subconjuntos/11-04-2004/Sena.jpeg",
            "subconjuntos/11-04-2004/TorreEiffel.jpg",
            "subconjuntos/11-04-2004/Versalles.jpg"
        ]
    },
    {
        "name": "14-04-2004",
        "folders": [],
        "photos": [
            "subconjuntos/14-04-2004/dinisClubHouse.jpeg",
            "subconjuntos/14-04-2004/Disneyland.jpeg",
            "subconjuntos/14-04-2004/fireworks.jpeg",
            "subconjuntos/14-04-2004/montanhaFrancesa.jpg",
            "subconjuntos/14-04-2004/showMickey.jpeg",
            "subconjuntos/14-04-2004/showNatal.jpeg"
        ]
    },
    {
        "name": "15-04-2004",
        "folders": [],
        "photos": [
            "subconjuntos/15-04-2004/crepe.jpeg",
            "subconjuntos/15-04-2004/croissant.jpg",
            "subconjuntos/15-04-2004/mime.jpg",
            "subconjuntos/15-04-2004/Psg.jpeg",
            "subconjuntos/15-04-2004/streetArt.jpeg"
        ]
    }
];

// Function to render the current folder based on the folder path
function renderCurrentFolder(folderPath) {
    let currentFolder = paris;
    let currentPhotos = []

    // Traverse the file path to the target folder
    folderPath.forEach(folderName => {
        currentPhotos = currentFolder.find(f => f.name === folderName).photos;
    });

    folderPath.forEach(folderName => {
        currentFolder = currentFolder.find(f => f.name === folderName).folders;
    });

    // Update folder path on top bar
    updateTopBar(folderPath)

    // Clear the content area for new rendering
    const contentDiv = document.querySelector('#fiches');
    contentDiv.innerHTML = '';

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
        currentPhotos.forEach(photo => {
            const photoName = photo.split('/').pop();
            const photoElement = document.createElement('div');
            photoElement.innerHTML = `<img src="${photo}"><br><label>${photoName}</label>`;
            photoElement.addEventListener('click', openPhoto)
            contentDiv.appendChild(photoElement);
        })};

// Function to update the top bar with the clickable folder path, with "Memento Gallery" as the root
function updateTopBar(folderPath) {
    const topBar = document.querySelector('.top_bar span');
    topBar.innerHTML = ''; // Clear existing top bar contents

    // Add "Memento Gallery" as the root link
    const rootLink = document.createElement('span');
    rootLink.textContent = 'Novo Álbum';
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

function fiches() {
    renderCurrentFolder(root); // Render the initial folder structure
    updateTopBar()
}