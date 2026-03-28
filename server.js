const app = require("./src/app");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

