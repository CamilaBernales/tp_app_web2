const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aw2'
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});

// Rutas para productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener productos de la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.post('/productos', (req, res) => {
  const nuevoProducto = req.body;
  connection.query('INSERT INTO productos SET ?', nuevoProducto, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar producto a la base de datos' });
    } else {
      res.json({ ...nuevoProducto, id: result.insertId });
    }
  });
});

app.put('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const datosActualizados = req.body;
  connection.query('UPDATE productos SET ? WHERE id = ?', [datosActualizados, productoId], (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.json({ ...datosActualizados, id: productoId });
    }
  });
});

app.delete('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  connection.query('DELETE FROM productos WHERE id = ?', productoId, (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.json({ mensaje: 'Producto eliminado correctamente' });
    }
  });
});

// Rutas para vendedores
app.get('/vendedores', (req, res) => {
  connection.query('SELECT * FROM vendedores', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener vendedores de la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.post('/vendedores', (req, res) => {
  const nuevoVendedor = req.body;
  connection.query('INSERT INTO vendedores SET ?', nuevoVendedor, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar vendedor a la base de datos' });
    } else {
      res.json({ ...nuevoVendedor, id: result.insertId });
    }
  });
});

app.put('/vendedores/:id', (req, res) => {
  const vendedorId = parseInt(req.params.id);
  const datosActualizados = req.body;
  connection.query('UPDATE vendedores SET ? WHERE id = ?', [datosActualizados, vendedorId], (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Vendedor no encontrado' });
    } else {
      res.json({ ...datosActualizados, id: vendedorId });
    }
  });
});

app.delete('/vendedores/:id', (req, res) => {
  const vendedorId = parseInt(req.params.id);
  connection.query('DELETE FROM vendedores WHERE id = ?', vendedorId, (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Vendedor no encontrado' });
    } else {
      res.json({ mensaje: 'Vendedor eliminado correctamente' });
    }
  });
});

// Rutas para ventas
app.get('/ventas', (req, res) => {
  connection.query('SELECT * FROM ventas', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener ventas de la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.post('/ventas', (req, res) => {
  const nuevaVenta = req.body;
  connection.query('INSERT INTO ventas SET ?', nuevaVenta, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar venta a la base de datos' });
    } else {
      res.json({ ...nuevaVenta, id: result.insertId });
    }
  });
});

app.put('/ventas/:id', (req, res) => {
  const ventaId = parseInt(req.params.id);
  const datosActualizados = req.body;
  connection.query('UPDATE ventas SET ? WHERE id = ?', [datosActualizados, ventaId], (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Venta no encontrada' });
    } else {
      res.json({ ...datosActualizados, id: ventaId });
    }
  });
});

app.delete('/ventas/:id', (req, res) => {
  const ventaId = parseInt(req.params.id);
  connection.query('DELETE FROM ventas WHERE id = ?', ventaId, (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Venta no encontrada' });
    } else {
      res.json({ mensaje: 'Venta eliminada correctamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en http://localhost:${PORT}`);
});
