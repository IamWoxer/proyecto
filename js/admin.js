const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67b634a2acd3cb34a8e89825";
const JSONBIN_API_KEY = "67b63290e41b4d34e49460c";

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || user.userRole !== "admin") {
        alert("Acceso denegado. Debes ser administrador.");
        window.location.href = "login.html";
    }
});


async function cargarUsuarios() {
    try {
        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": JSONBIN_API_KEY }
        });
        const data = await response.json();
        mostrarUsuarios(data.record);
    } catch (error) {
        console.error("Error al cargar los usuarios", error);
    }
}

function mostrarUsuarios(users) {
    const targetTable = document.getElementById("userTable");
    targetTable.innerHTML = "";
    users.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editarUsuario('${user.email}')">Editar</button>
                <button onclick="eliminarUsuario('${user.email}')">Eliminar</button>
            </td>
        </tr>`;
        targetTable.innerHTML += row;
    });
}

function editarUsuario(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);
    if (user) {
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("role").value = user.role;
        document.getElementById("editEmail").value = user.email;
    }
}

async function guardarUsuario() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const editEmail = document.getElementById("editEmail").value;

    if (!name || !email) {
        alert("Todos los campos son obligatorios");
        return;
    }

    try {
        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": JSONBIN_API_KEY }
        });
        let data = await response.json();
        let users = data.record;

        if (editEmail) {
            users = users.map(user => user.email === editEmail ? { name, email, role } : user);
        } else {
            users.push({ name, email, role });
        }

        await fetch(JSONBIN_URL, {
            method: "PUT",
            headers: {
                "X-Master-Key": JSONBIN_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ record: users })
        });

        alert("Usuario guardado exitosamente");
        location.reload();
    } catch (error) {
        console.error("Error al guardar usuario", error);
    }
}

async function eliminarUsuario(email) {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
        const response = await fetch(JSONBIN_URL, {
            headers: { "X-Master-Key": JSONBIN_API_KEY }
        });
        let data = await response.json();
        let users = data.record.filter(user => user.email !== email);

        await fetch(JSONBIN_URL, {
            method: "PUT",
            headers: {
                "X-Master-Key": JSONBIN_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ record: users })
        });

        alert("Usuario eliminado exitosamente");
        location.reload();
    } catch (error) {
        console.error("Error al eliminar usuario", error);
    }
}