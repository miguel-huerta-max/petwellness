// backend/models/Mascota.js
const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    sintomas: { type: String, required: true },
    diagnostico: { type: String, required: true },
    id_veterinario: { type: mongoose.Schema.Types.ObjectId, ref: 'Veterinario' }
});

const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String },
    edad: { type: Number },
    dueño: {
        nombre: { type: String, required: true },
        telefono: { type: String }
    },
    consultas: [consultaSchema]
});

const Mascota = mongoose.model('Mascota', mascotaSchema);
module.exports = Mascota;