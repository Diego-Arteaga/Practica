

// Función para abrir el modal
function abrirModal() {
    modalAdd.style.display = 'block';
}

// Función para cerrar el modal haciendo clic en la 'x'
function cerrarModal() {
    modalAdd.style.display = 'none';
}

// Función para cerrar el modal haciendo clic fuera de él
function clicFuera(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}