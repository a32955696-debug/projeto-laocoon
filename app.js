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

const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT, () =>
    console.log("Servidor rodando na porta " + PORT)
);