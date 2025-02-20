document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userSpan = document.getElementById("user-name");

    if (user) {
        if (userSpan) userSpan.textContent = user.fullName;
    } else {
        if (!window.location.pathname.includes("login.html")) {
            alert("Debes iniciar sesión");
            window.location.href = "login.html";
        }
    }
});

// Cerrar sesión
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Asegurar que el botón de atrás no permita regresar sin sesión
window.onpopstate = function () {
    if (!localStorage.getItem("user")) {
        window.location.href = "login.html";
    }
};