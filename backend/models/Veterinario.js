const mongoose = require('mongoose');

const veterinarioSchema = new mongoose.Schema({
  nombre_completo: { type: String, required: true },
  especialidad: { type: String },
  cedula_profesional: { type: String }
});

// El primer argumento es el nombre singular del modelo, Mongoose creará la colección en plural ('veterinarios')
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

module.exports = Veterinario;