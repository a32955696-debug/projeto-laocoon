const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/mensagem", function (req, res) {
    res.json({ mensagem: "Olá do servidor Node!" });
});

http.createServer(app).listen(8080, () =>
    console.log("Servidor rodando local na porta 8080")
);