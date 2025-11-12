const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 15,
        validate:{
            validator: (value) => {
                const regex = /^[A-Za-z0-9]+$/;
                return regex.test(value)
            }
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: (value) => {
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/;
                return regex.test(value)
            } 
        }
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function (value) {
                // Permitir contraseñas cifradas que comienzan con "$2b$"
                if (value.startsWith('$2b$')) return true;

                // Validación personalizada para contraseñas en texto plano
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número."
        
        },
        trim: true
    },

    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
        validate:{
            validator: (value) => {
                const regex = /^[A-Za-z]{2,30}$/;
                return regex.test(value);
            }
        }
    },

    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
        validate:{
            validator: (value) => {
                const regex = /^[A-Za-z]{2,30}$/;
                return regex.test(value);
            }
        }
    },

    role:{
        type: String,
        required: true,
        enum: ["user","admin","moderator"]
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },

    isActive: {
        type: Boolean,
        default: true,
    }

});

module.exports = mongoose.model("User", userSchema)