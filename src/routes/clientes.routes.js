const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientes.controller");
const validarCliente = require("../middlewares/validarCliente");
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/login", controller.login);
router.get("/", authMiddleware, controller.listar);
router.get("/:id", authMiddleware, controller.buscarPorId);
router.post("/", validarCliente, controller.criar);
router.put("/:id", authMiddleware, validarCliente, controller.atualizar);
router.delete("/:id", authMiddleware, controller.deletar);
router.post("/agendamentos/", authMiddleware, controller.criarAgendamento);
router.get("/agendamentos/:id", controller.buscarAgendamentoPorId);
router.put("/agendamentos/:idCorte", authMiddleware, controller.editarAgendamento);
module.exports = router;