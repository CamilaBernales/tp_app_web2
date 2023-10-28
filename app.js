const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Función para cargar datos desde un archivo JSON
function cargarDatosDesdeArchivo(archivo) {
  try {
    const datos = fs.readFileSync(archivo, 'utf8');
    return JSON.parse(datos);
  } catch (error) {
    console.error(`Error al cargar datos desde ${archivo}:`, error.message);
    return [];
  }
}

// simulación de una base de datos
const productos = cargarDatosDesdeArchivo('./json/productos.json');
const vendedores = cargarDatosDesdeArchivo('./json/vendedores.json');
const ventas = cargarDatosDesdeArchivo('./json/ventas.json');

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const datosActualizados = req.body;
  const index = productos.findIndex(p => p.id === productoId);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
    res.json(productos[index]);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

app.delete('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);

  // Verificar si existen ventas asociadas al producto
  const ventasAsociadas = ventas.filter(venta => venta.id_producto === productoId);

  if (ventasAsociadas.length > 0) {
    // Eliminar las ventas asociadas al producto
    ventas = ventas.filter(venta => venta.id_producto !== productoId);
  }
  productos = productos.filter(p => p.id !== productoId);
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

app.get('/vendedores', (req, res) => {
  res.json(vendedores);
});

app.post('/vendedores', (req, res) => {
  const nuevoVendedor = req.body;
  vendedores.push(nuevoVendedor);
  res.json(nuevoVendedor);
});

app.put('/vendedores/:id', (req, res) => {
  const vendedorId = parseInt(req.params.id);
  const datosActualizados = req.body;
  const index = vendedores.findIndex(v => v.id === vendedorId);
  if (index !== -1) {
    vendedores[index] = { ...vendedores[index], ...datosActualizados };
    res.json(vendedores[index]);
  } else {
    res.status(404).json({ mensaje: 'Vendedor no encontrado' });
  }
});

app.delete('/vendedores/:id', (req, res) => {
  const vendedorId = parseInt(req.params.id);

  // Verificar si existen ventas asociadas al vendedor
  const ventasAsociadas = ventas.filter(venta => venta.id_vendedor === vendedorId);

  if (ventasAsociadas.length > 0) {
    // Eliminar las ventas asociadas al vendedor
    ventas = ventas.filter(venta => venta.id_vendedor !== vendedorId);
  }
  vendedores = vendedores.filter(v => v.id !== vendedorId);
  res.json({ mensaje: 'Vendedor eliminado correctamente' });
});

// Rutas para ventas
app.get('/ventas', (req, res) => {
  res.json(ventas);
});

app.post('/ventas', (req, res) => {
  const nuevaVenta = req.body;
  ventas.push(nuevaVenta);
  res.json(nuevaVenta);
});

app.put('/ventas/:id', (req, res) => {
  const ventaId = parseInt(req.params.id);
  const datosActualizados = req.body;
  const index = ventas.findIndex(v => v.id === ventaId);
  if (index !== -1) {
    ventas[index] = { ...ventas[index], ...datosActualizados };
    res.json(ventas[index]);
  } else {
    res.status(404).json({ mensaje: 'Venta no encontrada' });
  }
});

app.delete('/ventas/:id', (req, res) => {
  const ventaId = parseInt(req.params.id);
  // Eliminar la venta
  ventas = ventas.filter(v => v.id !== ventaId);
  res.json({ mensaje: 'Venta eliminada correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en http://localhost:${PORT}`);
});
