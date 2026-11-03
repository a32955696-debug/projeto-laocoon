const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "docs")));

app.get("/api/mensagem", function (req, res) {
    res.json({ mensagem: "Olá do servidor Node!" });
});

const mensagens = [];

app.post("/api/contacto", function (req, res) {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ erro: "Preencha nome, email e mensagem." });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ erro: "Email inválido." });
    }

    mensagens.push({ nome, email, mensagem, data: new Date() });
    console.log("Nova mensagem de contacto:", nome, "-", email);

    res.status(201).json({ ok: true, resposta: "Mensagem recebida. Obrigado!" });
});

const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, () =>
    console.log("Servidor rodando na porta " + PORT)
);