const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Importa mongoose
require('dotenv').config(); // Carga las variables de .env
const path = require('path');

// Inicialización
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- 🔌 Conexión a la Base de Datos ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));
// ------------------------------------

// --- Rutas de la API ---
const Veterinario = require('./models/Veterinario');
const Mascota = require('./models/Mascota'); // ¡Importa el nuevo modelo!

// Ruta para obtener todos los veterinarios
app.get('/api/veterinarios', async (req, res) => {
  try {
    const veterinarios = await Veterinario.find(); // Busca todos los documentos
    res.json(veterinarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los veterinarios' });
  }
});

// POST: Crear un nuevo veterinario
app.post('/api/veterinarios', async (req, res) => {
    try {
        const nuevoVeterinario = new Veterinario(req.body);
        await nuevoVeterinario.save();
        res.status(201).json({ message: 'Veterinario registrado exitosamente', veterinario: nuevoVeterinario });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar al veterinario', error });
    }
});

// PUT: Actualizar un veterinario por su ID
app.put('/api/veterinarios/:id', async (req, res) => {
    try {
        const veterinarioActualizado = await Veterinario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!veterinarioActualizado) {
            return res.status(404).json({ message: 'Veterinario no encontrado' });
        }
        res.json({ message: 'Veterinario actualizado exitosamente', veterinario: veterinarioActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar al veterinario', error });
    }
});

// DELETE: Borrar un veterinario por su ID
app.delete('/api/veterinarios/:id', async (req, res) => {
    try {
        const veterinarioBorrado = await Veterinario.findByIdAndDelete(req.params.id);
        if (!veterinarioBorrado) {
            return res.status(404).json({ message: 'Veterinario no encontrado' });
        }
        res.json({ message: 'Veterinario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar al veterinario', error });
    }
});

// --- NUEVAS RUTAS PARA MASCOTAS ---

// POST: Crear una nueva mascota
app.post('/api/mascotas', async (req, res) => {
    try {
        const nuevaMascota = new Mascota(req.body);
        await nuevaMascota.save();
        res.status(201).json({ message: 'Mascota registrada exitosamente', mascota: nuevaMascota });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar la mascota', error });
    }
});

// GET: Obtener todas las mascotas
app.get('/api/mascotas', async (req, res) => {
    try {
        const mascotas = await Mascota.find();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las mascotas' });
    }
});

// GET: Obtener UNA mascota por su ID
app.get('/api/mascotas/:id', async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json(mascota);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mascota' });
    }
});

// PUT: Actualizar una mascota por su ID
app.put('/api/mascotas/:id', async (req, res) => {
    try {
        const mascotaActualizada = await Mascota.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Esta opción devuelve el documento actualizado
        );
        if (!mascotaActualizada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json({ message: 'Mascota actualizada exitosamente', mascota: mascotaActualizada });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la mascota', error });
    }
});

// DELETE: Borrar una mascota por su ID
app.delete('/api/mascotas/:id', async (req, res) => {
    try {
        const mascotaBorrada = await Mascota.findByIdAndDelete(req.params.id);
        if (!mascotaBorrada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.json({ message: 'Mascota eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota', error });
    }
});

// ------------------------------------
// POST: Añadir una consulta a una mascota existente
app.post('/api/mascotas/:id/consultas', async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        // Añade la nueva consulta al array de consultas de la mascota
        mascota.consultas.push(req.body);
        await mascota.save();

        res.status(201).json({ message: 'Consulta registrada exitosamente', mascota });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar la consulta', error });
    }
});

// Ruta de prueba (la dejamos por ahora)
app.get('/api/test', (req, res) => {
  res.json({ message: '¡El backend se está comunicando! 🎉' });
});

// Sirve los archivos estáticos de la aplicación de React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Para cualquier otra petición (que no sea a la API), devuelve el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});