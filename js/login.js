const SHEET_URL = "https://spreadsheets.google.com/feeds/list/1SNPu1J0dWHvkE1zUTP925Kwn3NsQm-7uEcMSdFcl3QM/1/public/values?alt=json";
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67b634a2acd3cb34a8e89825"; // URL de la base de datos en JSONBin.io
const JSONBIN_API_KEY = "67b63290e41b4d34e49460c4"; // Clave API para autenticación

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    verificarSesion();
});

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!username || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        const users = data.feed.entry;
        
        let authenticatedUser = null;
        users.forEach(user => {
            const userEmail = user["gsx$email"].$t;
            const userPass = user["gsx$password"].$t;
            const userRole = user["gsx$role"].$t;
            const fullName = user["gsx$name"].$t;
            
            if (username === userEmail && password === userPass) {
                authenticatedUser = { username, fullName, userRole };
            }
        });

        if (authenticatedUser) {
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            alert("Inicio de sesión exitoso");
            window.location.href = "inicio.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        console.error("Error al obtener los datos: ", error);
        alert("Error al conectar con el servidor");
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const role = "user";

    if (!name || !email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("TU_URL_DE_GOOGLE_APPS_SCRIPT", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });
        
        const result = await response.json();
        if (result.success) {
            alert("Registro exitoso");
            window.location.href = "login.html";
        } else {
            alert("Error en el registro");
        }
    } catch (error) {
        console.error("Error al registrar usuario", error);
    }
}

function verificarSesion() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userSpan = document.getElementById("user-name");
    
    if (user) {
        if (userSpan) userSpan.textContent = user.fullName;
    } else {
        if (window.location.pathname !== "/login.html" && window.location.pathname !== "/registro.html") {
            alert("Debes iniciar sesión");
            window.location.href = "login.html";
        }
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}
