const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
const PORT = 8080;

// Archivos donde se guardan los datos
const productsFile = "./products.json";
const cartsFile = "./carts.json";

// ------------------ PRODUCTS ------------------

// GET /api/products -> lista todos los productos
app.get("/api/products", (req, res) => {
  const data = fs.existsSync(productsFile) ? JSON.parse(fs.readFileSync(productsFile)) : [];
  res.json(data);
});

// GET /api/products/:pid -> producto por id
app.get("/api/products/:pid", (req, res) => {
  const data = JSON.parse(fs.readFileSync(productsFile));
  const product = data.find(p => p.id == req.params.pid);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// POST /api/products -> agregar producto
//agrega producto en body tipo json
app.post("/api/products", (req, res) => {
  const data = fs.existsSync(productsFile) ? JSON.parse(fs.readFileSync(productsFile)) : [];
  //crea id autoincremental
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || []
  };

  data.push(newProduct);
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
  res.status(201).json(newProduct);
});

// PUT /api/products/:pid -> actualizar producto
app.put("/api/products/:pid", (req, res) => {
  const data = JSON.parse(fs.readFileSync(productsFile));
  const pid = req.params.pid;
  const productIndex = data.findIndex(p => p.id == pid);

  if (productIndex === -1) return res.status(404).json({ error: "Producto no encontrado" });

  const updatedProduct = { ...data[productIndex], ...req.body, id: data[productIndex].id };
  data[productIndex] = updatedProduct;

  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
  res.json({ mensaje: "Producto actualizado", producto: updatedProduct });
});

// DELETE /api/products/:pid -> eliminar producto
app.delete("/api/products/:pid", (req, res) => {
  const data = JSON.parse(fs.readFileSync(productsFile));
  const pid = req.params.pid;
  const newData = data.filter(p => p.id != pid);

  if (data.length === newData.length) return res.status(404).json({ error: "Producto no encontrado" });

  fs.writeFileSync(productsFile, JSON.stringify(newData, null, 2));
  res.json({ mensaje: "Producto eliminado" });
});

// ------------------ CARTS ------------------

// POST /api/carts -> crear carrito vacío
app.post("/api/carts", (req, res) => {
  const data = fs.existsSync(cartsFile) ? JSON.parse(fs.readFileSync(cartsFile)) : [];
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  const newCart = { id: newId, products: [] };

  data.push(newCart);
  fs.writeFileSync(cartsFile, JSON.stringify(data, null, 2));
  res.status(201).json(newCart);
});

// GET /api/carts/:cid -> mostrar productos de un carrito
app.get("/api/carts/:cid", (req, res) => {
  const data = JSON.parse(fs.readFileSync(cartsFile));
  const cart = data.find(c => c.id == req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart.products);
});

// ------------------ SERVIDOR ------------------
app.listen(PORT, () => {
  console.log("Servidor escuchando en puerto " + PORT);
});
