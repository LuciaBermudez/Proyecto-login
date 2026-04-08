const jwt = require("jsonwebtoken");

// 🔥 Simulación de base de datos
let usuarios = [
    {
        nombre: "Admin",
        correo: "admin@gmail.com",
        password: "123456",
        rol: "admin"
    }
];

// LOGIN
exports.login = (correo, password) => {

    const usuario = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (!usuario) {
        return { error: "Credenciales incorrectas" };
    }

    const token = jwt.sign(
        { correo: usuario.correo, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        mensaje: "Login exitoso",
        token,
        rol: usuario.rol // 🔥 IMPORTANTE
    };
};

// REGISTRO
exports.registro = (nombre, correo, password) => {

    const existe = usuarios.find(u => u.correo === correo);

    if (existe) {
        return { error: "El usuario ya existe" };
    }

    const nuevoUsuario = {
        nombre,
        correo,
        password,
        rol: "cliente" // 🔥 SIEMPRE cliente
    };

    usuarios.push(nuevoUsuario);

    return {
        mensaje: "Usuario registrado correctamente"
    };
};