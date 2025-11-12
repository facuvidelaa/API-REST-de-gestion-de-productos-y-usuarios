const Product = require ('../models/product.model')

async function getProduct (req, res) {

    try {
        const products = await Product.find().select({image: 0})

        res.status(200).send ({
            ok: true,
            message: "PRODUCTOS OBTENIDOS CORRECTAMENTE",
            products
        })

    } catch (error) {
        console.log(error)

        res.status(500).send({
            ok: false,
            message: "ERROR AL OBTENER LOS PRODUCTOS"
        })
    }
}

async function getProductById (req, res) {

    try {
        const id = req.params.id;

        const product = await Product.findById(id).select({image: 0})

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "NO SE PUDO ENCONTRAR EL PRODUCTO"
            })
        }

        res.status(200).send({
            ok: true,
            message: "PRODUCTO ENCONTRADO",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "USUARIO NO ENCONTRADO"
        })
    }
}

async function postProduct(req, res) {
    try {
      const { file, body } = req;
  
      console.log("req.body:", body);
      console.log("req.file:", file);
  
      if (!file) {
        return res.status(400).send({
          ok: false,
          message: "Se requiere una imagen para crear el producto",
        });
      }

      body.image = `/uploads/${file.filename}`;

      const product = new Product(body);
      const newProduct = await product.save();
  
      res.status(201).send({
        ok: true,
        message: "Producto creado correctamente",
        product: newProduct,
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({
        ok: false,
        message: "Error al crear el producto",
      });
    }
  }
  


async function deleteProduct (req, res){
     try {
        const id = req.params.id

        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            return res.status (404).send ({
                ok: false,
                message: "PRODUCTO NO ENCONTRADO"
            })
        }

        res.status(200).send ({
            ok: true,
            message: "EL PRODUCTO FUE BORRADO CORRECTAMENTE"
        })
     } catch (error) {
        console.log(error)
        res.status(500).send ({
            ok: false,
            message: "ERROR AL BORRAR EL PRODUCTO"
        })
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const { file, body } = req;

        // Si se cargó una nueva imagen, agregarla al cuerpo
        if (file) {
            body.image = `/uploads/${file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró el producto",
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto",
        });
    }
}



module.exports = {
    getProduct,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct
}