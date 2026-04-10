const request = require("supertest");
const app = require("../app");

describe("Prueba de integración", () => {

    test("POST /api/login", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                correo: "admin@gmail.com",
                password: "123456"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe("Login exitoso");
    });

});