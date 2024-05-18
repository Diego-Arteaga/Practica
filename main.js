//-------------------------------------------------------------------Listar alumnos --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    readAlumnos();
  })

function readAlumnos() {
    fetch('http://webservices.mx/escolares/test/alumnos/listar')
    .then(resp => resp.json())
    .then(data => {
        console.log(data.meta);
        alumnos = data.response;
        renderResult(alumnos);

    })
    .catch(error => console.error(error));
}

const renderResult = (alumnos) => {
    let listHTML = "";
    alumnos.forEach(alumno => {
        listHTML += `
            <tr>
                <td>${alumno.id}</td>
                <td>${alumno.clave}</td>
                <td>${alumno.matricula}</td>
                <td>${alumno.paterno}</td>
                <td>${alumno.materno}</td>
                <td>${alumno.nombre}</td>
                <td class="opciones">
                    <button class="btnOpcion" type="button" onclick="editarAlumno('${alumno.id}')">Editar</button>
                    <button class="btnOpcion" type="button" onclick="openModalConfirm(${alumno.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    document.querySelector('#datosAlumnos').innerHTML = listHTML;
  }

  //-------------------------------------------------------------------Agregar Alumno----------------------------------------------------------------------
  function createAlumno(datosAlumno) {
    fetch('http://webservices.mx/escolares/test/alumnos/agregar', {
      method: 'POST',
      body: JSON.stringify(datosAlumno)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      document.querySelector('#addForm').reset();
      readAlumnos();
      closeAdd();
    })
    .catch(error => console.error(error));
  };
  
  const form = document.getElementById('addForm');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const alumno = {
      clave: document.getElementById('clave').value,
      matricula: document.getElementById('matricula').value,
      paterno: document.getElementById('paterno').value,
      materno: document.getElementById('materno').value,
      nombre: document.getElementById('nombre').value
    };
  
    createAlumno(alumno);
  });

//---------------------------------------------------------------------------Editar alumno --------------------------------------------------------------------
function editarAlumno(id) {
    let alumno = alumnos.find(alumno => alumno.id === id);

    if (alumno) {
        document.querySelector("#editForm #clave").value = alumno.clave;
        document.querySelector("#editForm #matricula").value = alumno.matricula;
        document.querySelector("#editForm #paterno").value = alumno.paterno;
        document.querySelector("#editForm #materno").value = alumno.materno;
        document.querySelector("#editForm #nombre").value = alumno.nombre;

        openEdit();
    } else {
        console.log("Alumno no encontrado");
    }

    const form = document.getElementById('editForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
      
        const alumno = {
            id: id,
            clave: document.querySelector("#editForm #clave").value,
            matricula: document.querySelector("#editForm #matricula").value,
            paterno: document.querySelector("#editForm #paterno").value,
            materno: document.querySelector("#editForm #materno").value,
            nombre: document.querySelector("#editForm #nombre").value
        };
        updateAlumno(alumno);
    });
};

function updateAlumno(alumno){
    fetch(`http://webservices.mx/escolares/test/alumnos/guardar/${alumno.id}`, {
      method: 'PUT',
      body: JSON.stringify(alumno),
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        readAlumnos();
    })
    .catch(error => console.error(error));
};

//----------------------------------------------------------------Eliminar Alumno --------------------------------------------
let deleteId = null;

const deleteAlumno = (id) => {

    fetch(`http://webservices.mx/escolares/test/alumnos/eliminar/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(datos => {
        console.log(datos);
        readAlumnos();
        closeModalConfirm();
        deleteId = null;
    })
    .catch(error => {
        console.error(error);
    })
  }
  
  const confirmDelete = (res) => {
    if(res){
      deleteAlumno(deleteId);
    } else {
      closeModalConfirm();
    }
  }