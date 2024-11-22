let current_step = 0;

function next_step(current_step) {
    current_step++;
    if (current_step == 1) {
        document.getElementById("photos").style.display = "block";
        document.getElementById("criterios").style.display = "none";
    }
    if (current_step == 2) {
        document.getElementById("photos").style.display = "none";
        document.getElementById("criterios").style.display = "flex";
    }
    if (current_step == 3) {
        document.getElementById("photos").style.display = "none";
        document.getElementById("criterios").style.display = "none";
    }
}

/**
 * Obtém a data de captura de uma imagem através dos metadados EXIF.
 * @param {File} file - O arquivo de imagem.
 * @returns {Promise<Date|null>} - Retorna uma Promise que resolve para a data de captura ou null se não encontrada.
 */
function obterDataDeCaptura(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            EXIF.getData(data, function () {
                const date = EXIF.getTag(this, "DateTimeOriginal");
                if (date) {
                    resolve(new Date(date.replace(/:/g, "-")));
                } else {
                    resolve(null);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    });
}

function setEventListeners() {
    const addPhotoButton = document.getElementById("addPhotos");
    const fileInput = document.getElementById("fileInput");

    // Disparar input de arquivo ao clicar no botão
    addPhotoButton.addEventListener("click", () => {
        fileInput.click();
    });

    // Próximo passo
    document.getElementById("next").addEventListener("click", () => {
        next_step(current_step);
    });

    // Manipula arquivos de imagem selecionados
    fileInput.addEventListener("change", async (event) => {
        const imagePreview = document.getElementById("photos");
        const button = document.getElementById("next");
        button.disabled = false;
        imagePreview.innerHTML = ""; // Limpa visualizações anteriores

        const files = Array.from(event.target.files);
        const imagesWithDates = [];

        // Obter data de captura para cada imagem
        for (const file of files) {
            if (file.type.startsWith("image/")) {
                const captureDate = await obterDataDeCaptura(file);
                imagesWithDates.push({ file, captureDate });
            }
        }

        // Ordenar as imagens pela data de captura
        imagesWithDates.sort((a, b) => {
            if (!a.captureDate) return 1;
            if (!b.captureDate) return -1;
            return a.captureDate - b.captureDate;
        });

        // Exibir imagens organizadas
        for (const { file } of imagesWithDates) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => URL.revokeObjectURL(img.src);
            imagePreview.appendChild(img);
        }
    });
}

window.addEventListener("load", main);

function main() {
    setEventListeners();
    next_step(current_step);
}
