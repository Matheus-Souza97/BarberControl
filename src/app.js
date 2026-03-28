const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();
console.log("APP CARREGADO");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}); 

app.use("/clientes", clientesRoutes);

app.use(errorMiddleware);

module.exports = app;