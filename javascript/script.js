// script.js

function openAlbum(albumName) {
    // Atualiza o título do álbum na top bar
    document.getElementById('albumTitle').textContent = albumName;
    
    // Mostra a seta de voltar
    document.getElementById('backArrow').style.display = 'inline-block';

    // Exibe o modal de visualização do álbum com transição
    const albumView = document.getElementById('albumView');
    albumView.style.display = 'block';
    setTimeout(() => {
        albumView.style.transform = 'translateY(0)';
    }, 10); // Pequeno atraso para iniciar a animação
}

function closeAlbumView() {
    // Oculta a seta de voltar
    document.getElementById('backArrow').style.display = 'none';

    // Reverte a animação e oculta o modal
    const albumView = document.getElementById('albumView');
    albumView.style.transform = 'translateY(100%)';
    setTimeout(() => {
        albumView.style.display = 'none';
        document.getElementById('albumTitle').textContent = 'Memento Gallery';
    }, 400); // Aguarda o fim da transição para ocultar
}
