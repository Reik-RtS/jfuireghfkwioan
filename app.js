// app.js
const auth = firebase.auth();
const database = firebase.database();

// Manejo del formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Inicio de sesión exitoso');
        })
        .catch(error => {
            alert('Error en el inicio de sesión: ' + error.message);
        });
});

// Manejo del formulario de lectura de contratos
document.getElementById('read-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const contratoId = document.getElementById('read-contrato-id').value;

    database.ref('contratosAfiliados/' + contratoId).once('value')
        .then(snapshot => {
            document.getElementById('contrato-data').textContent = JSON.stringify(snapshot.val(), null, 2);
        })
        .catch(error => {
            alert('Error al leer los datos: ' + error.message);
        });
});

// Manejo del formulario de creación de contratos
document.getElementById('create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const contratoId = document.getElementById('create-contrato-id').value;
    const updates = {
        nombre: document.getElementById('create-nombre').value,
        // Añade todos los campos necesarios aquí
    };

    database.ref('contratosAfiliados/' + contratoId).set(updates)
        .then(() => {
            alert('Contrato creado exitosamente');
        })
        .catch(error => {
            alert('Error al crear el contrato: ' + error.message);
        });
});

// Manejo del formulario de actualización de contratos
document.getElementById('update-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const contratoId = document.getElementById('update-contrato-id').value;
    const updates = {
        nombre: document.getElementById('update-nombre').value,
        // Añade todos los campos necesarios aquí
    };

    database.ref('contratosAfiliados/' + contratoId).update(updates)
        .then(() => {
            alert('Contrato actualizado exitosamente');
        })
        .catch(error => {
            alert('Error al actualizar el contrato: ' + error.message);
        });
});
