const clienteSchema = require("../validations/clienteValidation");

const validarCliente = (req, res, next) => {
    const {error} = clienteSchema.validate(req.body);

    if  (error) {
        return res.status(400).json({erro: error.details[0].message});
    }

    next();
};

module.exports = validarCliente;