//--------------------------------------------------------------modal agregar--------------------
// Función para abrir el modal
function openAdd() {
    modalAdd.style.display = 'block';
}

// Función para cerrar el modal haciendo clic en la 'x'
function closeAdd() {
    modalAdd.style.display = 'none';
}

//--------------------------------------------------------------modal editar---------------------
// Función para abrir el modal
function openEdit() {
    modalEdit.style.display = 'block';
}

// Función para cerrar el modal haciendo clic en la 'x'
function closeEdit() {
    modalEdit.style.display = 'none';
}

//--------------------------------------------------------------modal eliminar-----------------------
const modalConfirm = document.getElementById('modalConfirm');

window.onclick = function(event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  }
}

const closeModalConfirm = () => {
  modalConfirm.style.display = 'none';
}

const openModalConfirm = (id) => {
  deleteId = id;
  modalConfirm.style.display = 'block';
}