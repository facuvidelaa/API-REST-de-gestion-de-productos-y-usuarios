const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 15
    },

    price:{
        type: Number,
        min: 0,
        max: 1000000,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    image: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const regex = /^\/uploads\/[\w-]+\.(jpg|jpeg|png|gif)$/i;
                return regex.test(value);
            }
        }    
    },
    

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },

    category: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model("Product", productSchema)