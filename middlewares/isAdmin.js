
const isAdmin = (req, res, next) => {
    
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).send({
            ok: false,
            message: "Acceso denegado. Solo administradores pueden realizar esta acción.",
        });
    }

    next(); 
};

module.exports = isAdmin;
