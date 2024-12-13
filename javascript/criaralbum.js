let current_step = 0
let havePhotos = 0
let done = false


function next_step(){
    const next = document.getElementById("next");
    current_step = current_step + 1
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
        document.getElementById("next").disabled = true;
        if(document.getElementById("album-name").value !== ""){
            document.getElementById("next").disabled = false;
        }
    }
    if(current_step >= 4){

        let fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
        let folderPath = JSON.parse(localStorage.getItem('folderPath'));
        let currentFolder = fileSystem

        // Traverse to the target folder
        folderPath.forEach(folder => {
            currentFolder = currentFolder.find(f => f.name === folder).folders;
        });

        // Add the new folder to the current folder
        currentFolder.push({
            name: document.getElementById("album-name").value,
            folders:[],
            photos:["subconjuntos/11-04-2004/ArcTriunfe.jpeg",
            "subconjuntos/11-04-2004/Louvre.jpeg",
            "subconjuntos/11-04-2004/Notre-Dame.jpeg",
            "subconjuntos/11-04-2004/Sena.jpeg",
            "subconjuntos/11-04-2004/TorreEiffel.jpg",
            "subconjuntos/11-04-2004/Versalles.jpg",
            "subconjuntos/14-04-2004/dinisClubHouse.jpeg",
            "subconjuntos/14-04-2004/Disneyland.jpeg",
            "subconjuntos/14-04-2004/fireworks.jpeg",
            "subconjuntos/14-04-2004/montanhaFrancesa.jpg",
            "subconjuntos/14-04-2004/showMickey.jpeg",
            "subconjuntos/14-04-2004/showNatal.jpeg",
            "subconjuntos/15-04-2004/crepe.jpeg",
            "subconjuntos/15-04-2004/mime.jpg",
            "subconjuntos/15-04-2004/croissant.jpg",
            "subconjuntos/15-04-2004/Psg.jpeg",
            "subconjuntos/15-04-2004/streetArt.jpeg"]
        });

        // Save the updated file system back to localStorage
        // Salve a estrutura atualizada
        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));

        window.location.href = "index.html"
    }
    
    makeStepDarker(current_step)
}

function previous_step(){
    current_step = current_step - 2
    next_step(current_step)
    document.getElementById("next").disabled = false;
}

function makeStepDarker(step_number){
    const steps = document.querySelectorAll("#step")

    steps.forEach(step => {
        step.classList.remove('selected');
    });

    if(step_number == 1){
        steps[0].classList.add("selected")
    };

    if(step_number == 2){
        steps[1].classList.remove("disabled")
        steps[1].classList.add("selected")
    }

    if(step_number == 3){
        steps[2].classList.remove("disabled")
        steps[2].classList.add("selected")
    }

    if(step_number >= 4){
        return
    }
}

function setCurrentStep(value){
    current_step = value - 1;
    document.getElementById("next").disabled = false;   
    next_step(current_step);
}

function setEventListeners(){
    // Seleciona a div que vai agir como botão e o input de ficheiros

    const addPhotoButton = document.getElementById('deviceOption');
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

        if(!done){
        next.addEventListener('click', () => {
            next_step(current_step)
            done = true
        })};
        
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

        document.getElementById("addPhotosPopup").style.display = "none";
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
    paragraph.textContent = '1. Adicione as Fotos';

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

window.addEventListener("load", function() {
    const radio = document.getElementById('nao_dividir');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const inputsToDisable = {
        "data": ["data_inicio", "data_fim"],
        "qualidade": ["qualityMin", "qualityMax"],
        "resolucao": ["resolucao_min", "resolucao_max"],
        "pessoa": ["pessoa_valor"],
        "tipo": ["tipo_valor"],
        "conteudo": ["conteudo_valor"],
        "loc": ["locationInput"]
    };

    // Disable or enable inputs based on whether the checkbox is checked or not
    function toggleInputFields(checkbox) {
        const inputIds = inputsToDisable[checkbox.id];
        if (inputIds) {
            inputIds.forEach(inputId => {
                document.getElementById(inputId).disabled = !checkbox.checked;
            });
        }
    }

    // When a checkbox is checked, disable the radio button
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                radio.checked = false;
            } else {
                // Check if any checkbox is still checked; if none are checked, re-enable the radio button
                const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                radio.checked = !anyChecked;
            }
            // Toggle the input fields related to the checkbox
            toggleInputFields(checkbox);
        });

        // Initialize the input fields on page load
        toggleInputFields(checkbox);
    });

    // When the radio button is checked, uncheck all checkboxes and disable inputs
    radio.addEventListener('change', function() {
        if (radio.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                toggleInputFields(checkbox);  // Disable the related inputs
            });
        }
    });

    const addPhotosDiv = document.getElementById("addPhotos");
    const addPhotosPopup = document.getElementById("addPhotosPopup");
    const closePopupAddPhotos = document.getElementById("closePopupAddPhotos");

    // Abrir o pop-up ao clicar em "Adicionar Fotos"
    addPhotosDiv.addEventListener("click", function () {
        addPhotosPopup.style.display = "flex"; // Exibir o pop-up
    });

    // Fechar o pop-up ao clicar no botão de fechar
    closePopupAddPhotos.addEventListener("click", function () {
        addPhotosPopup.style.display = "none"; // Esconder o pop-up
    });

    // // Adicionar funcionalidade às opções (exemplo)
    // document.getElementById("deviceOption").addEventListener("click", function () {
    //     alert("Adicionar fotos do dispositivo!");
    //     addPhotosPopup.style.display = "none"; // Fechar após a ação
    // });

    document.getElementById("facebookOption").addEventListener("click", function () {
        alert("Função não implementada");
        addPhotosPopup.style.display = "none";
    });

    document.getElementById("twitterOption").addEventListener("click", function () {
        alert("Função não implementada");
        addPhotosPopup.style.display = "none";
    });

    document.getElementById("instagramOption").addEventListener("click", function () {
        alert("Função não implementada");
        addPhotosPopup.style.display = "none";
    });

    document.getElementById("emailOption").addEventListener("click", function () {
        alert("Função não implementada");
        addPhotosPopup.style.display = "none";
    });
});
