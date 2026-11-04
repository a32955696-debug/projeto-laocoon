require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "docs")));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/api/mensagem", function (req, res) {
    res.json({ mensagem: "Olá do servidor Node!" });
});

app.post("/api/contacto", async function (req, res) {
    const { nome, email, mensagem } = req.body || {};

    if (typeof nome !== "string" || typeof email !== "string" || typeof mensagem !== "string"
        || !nome.trim() || !email.trim() || !mensagem.trim()) {
        return res.status(400).json({ erro: "Preencha nome, email e mensagem." });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ erro: "Email inválido." });
    }
    if (nome.length > 100 || email.length > 200 || mensagem.length > 2000) {
        return res.status(400).json({ erro: "Texto demasiado longo." });
    }

    try {
        await pool.query(
            "insert into contactos (nome, email, mensagem) values ($1, $2, $3)",
            [nome.trim(), email.trim(), mensagem.trim()]
        );
        console.log("Nova mensagem de contacto guardada:", nome.trim());
        res.status(201).json({ ok: true, resposta: "Mensagem recebida. Obrigado!" });
    } catch (erro) {
        console.error(
    "Erro ao guardar contacto:",
    erro.code || "",
    erro.message || "",
    (erro.errors || []).map(function (e) { return e.code; }).join(",")
);
        res.status(500).json({ erro: "Não foi possível guardar a mensagem. Tente mais tarde." });
    }
});

const PORT = process.env.PORT || 8080;
console.log("DATABASE_URL definida:", Boolean(process.env.DATABASE_URL));

http.createServer(app).listen(PORT, () =>
    console.log("Servidor rodando na porta " + PORT)
);