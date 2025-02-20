async function registrarUsuario() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoUsuario = {
        name,
        email,
        password,
        role
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzJkyOelO7HDjHEuSSWAxLvExCFy4lwGttUK-2ONmQ1I0ZOQYgMjbSPNMJCggBQL6vo/exec', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario)
        });

        if (response.ok) {
            alert("Usuario registrado con éxito.");
            window.location.href = "login.html";
        } else {
            alert("Error al registrar usuario.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
}
