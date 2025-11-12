const User = require ('../models/user.model')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Credenciales incorrectas.",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                ok: false,
                message: "Credenciales incorrectas.",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" } 
        );

        res.status(200).send({
            ok: true,
            message: "Inicio de sesión exitoso.",
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al iniciar sesión.",
        });
    }
}

async function getUsersById(req, res) {

    try {
        const id = req.params.id;
        
        const user = await User.findById(id).select({password: 0, bornDate: 0})

        if(!user){
            return res.status(404).send({
                ok: false,
                message: "No se pudo encontrar el usuario"
            })
        }

        res.status(200).send({
            ok: true,
            message:"Usuario encontrado",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "USUARIO NO ENCONTRADO"
        })
    }
}

async function getUsers (req, res) {
    try {
        const users = await User.find().select({password: 0})

        res.status(200).send({
            ok:true,
            message:"USUARIOS OBTENIDOS CORRACTAMENTE",
            users
        })

    } catch (error) {
        console.log(error)

        res.status(500).send({
            ok:false,
            message: "ERROR AL OBTENER USUARIOS"
        })
    }
}

async function postUser(req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = new User(req.body);
        console.log(user);

        const newUser = await user.save();

        newUser.password = undefined; 

        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send("ERROR AL CREAR USUARIO");
    }
}

async function deleteUser(req, res) {
    
    try {
        const id = req.params.id

        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            return res.status(404).send({
                ok: false,
                message: "USUARIO NO ENCONTRADO"
            })
        }

        res.status(200).send({
            ok: true,
            message: "EL USUARIO FUE BORRADO CORRECTAMENTE"
        })

    }   catch (error) {
        console.log(error)
        res.status(500).send ({
            ok: false,
            message: "ERROR AL BORRA EL USUARIO"
        })
    }
}

async function updateUser(req, res) {

    try{
        const id = req.params.id
        console.log(id)

        const newData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, newData, {new: true})

        if (!updatedUser){
            return res.status(404).send({
                ok: false,
                message: "NO SE ENCONTRO EL USUARIO"
            })
        }

        res.status(200).send({
            ok: true,
            message: "EL USUARIO SE ACTUALIZO CORRECTAMENTE"
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "NO SE PUDO ACTUALIZAR EL USUARIO"
        })
    }
}


module.exports = {
    getUsersById,
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    login
}