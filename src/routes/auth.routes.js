const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// middleware aplicado para login
router.post("/login", authMiddleware.verificarLogin, authController.login);

// middleware aplicado para el registro
router.post("/registro", authController.registro);

router.post("/recuperar", (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ error: "Correo requerido" });
    }

    console.log("📧 Simulación de envío a:", correo);

    res.json({
        mensaje: "Correo enviado correctamente"
    });
});

module.exports = router;

// Se agrega el token 
router.get("/perfil", authMiddleware.verificarToken, (req, res) => {
    res.json({
        mensaje: "Ruta protegida 🔐",
        usuario: req.usuario
    });
});