function setEventListeners(){
    // Seleciona a div que vai agir como botão e o input de ficheiros
    const addPhotoButton = document.getElementById('addPhotos');
    const fileInput = document.getElementById('fileInput');

    // Adiciona um evento de clique à div
    addPhotoButton.addEventListener('click', () => {
        fileInput.click(); // Dispara o clique no input escondido
    });
    
    // Mostra as imagens selecionadas
    fileInput.addEventListener('change', (event) => {
        const imagePreview = document.getElementById('photos');
        const button = document.getElementById("next");
        button.disabled = false    
        const files = event.target.files;
        
        // Itera pelos ficheiros selecionados
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src); // Liberta memória
                imagePreview.appendChild(img);
            }
        }
    });
}

window.addEventListener("load", main);

function main() {
    setEventListeners();
}