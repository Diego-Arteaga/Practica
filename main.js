function displayAlumnos() {
    const productList = document.getElementById('DatosAlumnos');

    getAlumnos()
    .then(alumnos => {
        DatosAlumnos.innerHTML = '';
        const claves = ['id', 'matricula', 'nombre_completo'];

        alumnos.response.forEach(alumno => {
            const row = document.createElement('tr');
            
            for (const key in alumno){
                const col = document.createElement
                if (claves.includes(key)) {
                    // Obtenemos el valor actual
                    const valorActual = alumno[key];
    
                    // Creamos una celda de tabla y agregamos el contenido
                    const col = document.createElement('td');
                    col.textContent = valorActual;
                    
                    // Agregamos la celda a la fila
                    row.appendChild(col);
                }
            }

            DatosAlumnos.appendChild(row);
        });
    });
}

// Función para obtener todos los productos
function getAlumnos() {
    return fetch("http://webservices.mx/escolares/test/alumnos/listar")
        .then(response => {
            if (!response.ok) {
                throw new Error('La conexion no fue exitosa');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Hubo un problema al obtener los productos:', error);
        });
}

// Función para crear un nuevo producto
function createAlumno(datos) {
    return fetch("http://webservices.mx/escolares/test/alumnos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La conexion no fue exitosa');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Hubo un problema al crear el alumno:', error);
    });
}

document.getElementById('formularioAlumno').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los datos del formulario
    const formData = new FormData(event.target);
    const datosAlumno = {};
    formData.forEach((value, key) => {
        datosAlumno[key] = value;
    });

    // Llamar a la función createAlumno para enviar los datos a la API REST
    createAlumno(datosAlumno)
    .then(response => {
        // Hacer algo con la respuesta del servidor, si es necesario
        alert('Alumno creado exitosamente');
    })
    .catch(error => {
        // Manejar el error, si ocurre
        alert('Hubo un problema al crear el alumno. Por favor, inténtalo de nuevo más tarde.');
    });
});

// Función para actualizar un producto existente
function updateAlumno(alumnoId, datos) {
    return fetch(`${"http://webservices.mx/escolares/test/alumnos/guardar"}/${alumnoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La conexion no fue exitosa');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Hubo un problema al actualizar el alumno:', error);
    });
}

// Función para eliminar un producto
function deleteAlumno(alumnoId) {
    return fetch(`${"http://webservices.mx/escolares/test/alumnos/eliminar"}/${alumnoId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La conexion no fue exitosa');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Hubo un problema al eliminar el producto:', error);
    });
}