const express = require('express');
const app = express();

// Middleware para analizar cuerpos de solicitudes JSON
app.use(express.json());

// Datos iniciales
const clientes = [
    { id: 1, nombre: 'Cliente 1', email: 'cliente1@example.com' },
    { id: 2, nombre: 'Cliente 2', email: 'cliente2@example.com' },
    { id: 3, nombre: 'Cliente 3', email: 'cliente3@example.com' }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Rutas

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a nuestra aplicación Express');
});

// Ruta para mostrar clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta para mostrar productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre: req.body.nombre,
        email: req.body.email
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Ruta para actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        cliente.nombre = req.body.nombre || cliente.nombre;
        cliente.email = req.body.email || cliente.email;
        res.json(cliente);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index !== -1) {
        const clienteEliminado = clientes.splice(index, 1);
        res.json(clienteEliminado);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (producto) {
        producto.nombre = req.body.nombre || producto.nombre;
        producto.precio = req.body.precio || producto.precio;
        res.json(producto);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1) {
        const productoEliminado = productos.splice(index, 1);
        res.json(productoEliminado);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
