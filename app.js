const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const logger = require("./src/middlewares/logger.middleware");
const errorMiddleware = require("./src/middlewares/error.middleware");
const authRoutes = require("./src/routes/auth.routes");

app.use(cors());
app.use(express.json());
app.use(logger.logger);

app.use("/api", authRoutes);

app.use(errorMiddleware.manejarErrores);

// 🔥 EXPORTAR app
module.exports = app;

// 🔥 SOLO ejecutar servidor si se ejecuta directamente
if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log("Servidor corriendo en puerto " + process.env.PORT);
    });
}