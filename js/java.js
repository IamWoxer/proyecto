// Función para iniciar sesión
function login(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Aquí validamos el usuario desde una base de datos (JSON o Google Sheets)
    const users = JSON.parse(localStorage.getItem('users')) || [];  // Supongamos que tienes un array de usuarios almacenado
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Si el usuario existe, almacenamos los datos en localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '../intex.html';  // Redirige a la página principal
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Verificar si el usuario está logueado al cargar la página
window.onload = function() {
    checkLogin(); // Función para verificar si el usuario está logueado
};

// Función para verificar si el usuario está logueado
function checkLogin() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        // Si el usuario está logueado, muestra su nombre
        document.getElementById('userWelcome').style.display = 'block';
        document.getElementById('userName').textContent = loggedInUser.name;
        document.getElementById('loginPrompt').style.display = 'none';
    } else {
        // Si no está logueado, muestra el mensaje de login
        document.getElementById('userWelcome').style.display = 'none';
        document.getElementById('loginPrompt').style.display = 'block';
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedInUser');  // Eliminar usuario logueado
    window.location.href = 'html/login.html';  // Redirigir al login
}
// Función para el inicio de sesión
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Comprobar si el usuario existe en localStorage
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        // Guardar datos del usuario en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = "html/bienestar";  // Redirigir al panel principal
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

// Función para el registro
function register(event) {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value;

    // Guardar el usuario en localStorage
    const user = {
        email: email,
        password: password,
        name: name
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert("Usuario registrado con éxito. Puedes iniciar sesión ahora.");
    window.location.href = "html/login.html";  // Redirigir a la página de login
}

function login(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // URL del archivo JSON (subido a un servicio como JSONBin)
    const jsonUrl = "https://api.jsonbin.io/v3/b/your-bin-id-here";

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Verificar si los datos del usuario coinciden
            const user = data.usuarios.find(user => user.correo === email && user.contrasena === password);

            if (user) {
                // Guardar la sesión en el localStorage
                localStorage.setItem('usuario', JSON.stringify(user));
                alert(`Bienvenido, ${user.nombre}`);
                window.location.href = "bienvenida.html"; // Redirige a la página de bienvenida
            } else {
                alert('Credenciales incorrectas. Intenta nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}



