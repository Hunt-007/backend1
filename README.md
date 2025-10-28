# backend1
inicie con el comando en la terminal
node app.js


GET /api/products -> lista todos los productos
http://localhost:8080/api/products

GET /api/products/:pid -> producto por id (debe entregar id)
http://localhost:8080/api/products/id de producto

POST /api/products -> agregar producto
http://localhost:8080/api/products

debe utilizar body raw formato JSON
{
  "title": "Teclado Redragon Kumara",
  "description": "Teclado mecánico RGB con switches blue",
  "code": "KB001",
  "price": 35990,
  "status": true,
  "stock": 8,
  "category": "Periféricos",
  "thumbnails": ["img/teclado1.jpg"]
}

PUT /api/products/:pid -> actualizar producto (debe entregar id)
http://localhost:8080/api/products/id

debe utilizar body raw formato JSON
{
  "price": 15990,
  "stock": 40
}

DELETE /api/products/:pid -> eliminar producto (debe entregar id)
http://localhost:8080/api/products/id

POST /api/carts -> crear carrito vacío

GET /api/carts/:cid -> mostrar productos de un carrito