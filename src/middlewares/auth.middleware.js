const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({erro: "Token não fornecido"});
    }

    const partes = authHeader.split(" ");

    if (partes.length !==2) {
        return res.status(401).json({erro: "Token mal formatado"});
    }

    const [scheme, token] = partes;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({erro: "Token mal formatado"});
    }

    jwt.verify(token, "segredo_super_guardado", (err, decoded) => {

        if (err) {
            return res.status(401).json({erro: "Token invalido"});
        }

        req.id = decoded.id;
        
        return next();
    });

};
