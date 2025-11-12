const express = require('express')
const router = express.Router();
//const isAdmin = require("../middlewares/isAdmin");
const productController = require('../controllers/product.controller')
const upload = require("../middlewares/upload");
const isAdmin = require('../middlewares/isAdmin');

//GET
router.get("/products", productController.getProduct)

//BY ID
router.get("/products/:id", productController.getProductById)

//POST
router.post("/products",  upload.single("image"), productController.postProduct)

//DELETE
router.delete("/products/:id", isAdmin, productController.deleteProduct)

//UPDATE
router.put("/products/:id", isAdmin, upload.single("image"), productController.updateProduct)

module.exports = router;