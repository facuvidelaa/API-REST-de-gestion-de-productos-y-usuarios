const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "Acceso denegado. Token no proporcionado.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.log(error)
        res.status(401).send({
            ok: false,
            message: "Token inválido o expirado.",
        });
    }
};

module.exports = auth;
