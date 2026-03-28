const Joi = require("joi");

const clienteSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    telefone: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(8).required()
});

module.exports = clienteSchema;