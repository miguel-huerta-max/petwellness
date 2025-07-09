// frontend/src/GestionMascotas.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilos.css'; // Crearemos este archivo para los estilos

const API_URL = 'https://petwellness-cvedf6efg5fsazgb.eastus2-01.azurewebsites.net/api/mascotas';

function GestionMascotas() {
    const [mascotas, setMascotas] = useState([]);
    const [mascotaActual, setMascotaActual] = useState(null); // Para saber si estamos editando
    const [formData, setFormData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        dueño: { nombre: '', telefono: '' }
    });
    const [busqueda, setBusqueda] = useState(''); // <-- AÑADE ESTA LÍNEA

    // ✅ 1. Nuevo estado para guardar la imagen como texto Base64
    const [imagenBase64, setImagenBase64] = useState('');

    // Cargar todas las mascotas al iniciar
    useEffect(() => {
        cargarMascotas();
    }, []);

    const cargarMascotas = async () => {
        const response = await axios.get(API_URL);
        setMascotas(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dueñoNombre' || name === 'dueñoTelefono') {
            setFormData(prevState => ({
                ...prevState,
                dueño: { ...prevState.dueño, [name === 'dueñoNombre' ? 'nombre' : 'telefono']: value }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // El resultado es la cadena Base64 completa, incluyendo el prefijo "data:image/..."
                setImagenBase64(reader.result);
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datosCompletos = {
        nombre: formData.nombre,
        especie: formData.especie,
        raza: formData.raza,
        edad: formData.edad,
        dueño: formData.dueño,
        imagen: imagenBase64 // Aquí se incluye la imagen convertida
    };        
        if (mascotaActual) {
            // Actualizar
            await axios.put(`${API_URL}/${mascotaActual._id}`, datosCompletos);
        } else {
            // Crear
            await axios.post(API_URL, datosCompletos);
        }
        resetFormulario();
        cargarMascotas();
    };

    const handleEditar = (mascota) => {
        setMascotaActual(mascota);
        setFormData({
            nombre: mascota.nombre,
            especie: mascota.especie,
            raza: mascota.raza,
            edad: mascota.edad,
            dueño: { nombre: mascota.dueño.nombre, telefono: mascota.dueño.telefono }
        });
        setImagenBase64(mascota.imagen || ''); // Muestra la imagen actual o nada si no tiene
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
            await axios.delete(`${API_URL}/${id}`);
            cargarMascotas();
        }
    };

    const resetFormulario = () => {
        setMascotaActual(null);
        setFormData({
            nombre: '',
            especie: '',
            raza: '',
            edad: '',
            dueño: { nombre: '', telefono: '' }
        });
        setImagenBase64(''); // ✅ 4. Limpia también la imagen
        // Busca el input por su ID y limpia su valor
        const inputFile = document.getElementById('imagenMascotaInput');
        if (inputFile) {
            inputFile.value = null;
        }
    };
    // <-- AÑADE ESTA LÍNEA ANTES DEL RETURN -->
    const mascotasFiltradas = mascotas.filter(mascota =>
        mascota.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    return (
            <div class="py-5" >
                <div class="container">
                <div class="row">
                    <div class="col-md-4">
                    <div class="text-center">
                        <div class="container">
                        <div class="row">
                            <div class="">
                                <h2>{mascotaActual ? 'Editar Mascota' : 'Registrar Nueva Mascota'}</h2>
                            <form class="text-left" onSubmit={handleSubmit}>
                                <div class="form-group"> <input type="text" class="form-control" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre de la mascota" required autoComplete='off'/> </div>
                                <div class="form-group"> <input type="text" class="form-control" name="especie" value={formData.especie} onChange={handleChange} placeholder="Especie (Perro, Gato, Ave)" required autoComplete='off'/> </div>
                                <div class="form-group"> <input type="text" class="form-control" name="raza" value={formData.raza} onChange={handleChange} placeholder="Raza" required autoComplete='off'/> </div>
                                <div class="form-group"> <input type="number" class="form-control" name="edad" value={formData.edad} onChange={handleChange} placeholder="Edad (Meses)" required autoComplete='off'/> </div>
                                <div class="form-row">
                                <div class="form-group col-md-6"> <input type="text" class="form-control" name="dueñoNombre" value={formData.dueño.nombre} onChange={handleChange} placeholder="Dueño/a" required autoComplete='off'/> </div>
                                <div class="form-group col-md-6"> <input type="text" class="form-control" name="dueñoTelefono" value={formData.dueño.telefono} onChange={handleChange} placeholder="Numero Telefono" required autoComplete='off'/> </div>
                                    {/* ✅ 5. El input para el archivo */}
                                <div className="form-group">
                                    <label>Imagen de la Mascota</label>
                                    <input 
                                        type="file" 
                                        className="form-control-file" 
                                        id="imagenMascotaInput" 
                                        name="imagen" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                    />
                                </div>
                            
                                {/* Si hay una imagen seleccionada, muéstrala como vista previa */}
                                {imagenBase64 && <img src={imagenBase64} alt="Vista previa" style={{width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px'}}/>}
                                </div>
                                <button type="submit" class="btn btn-success">{mascotaActual ? 'Actualizar' : 'Crear'}</button>
                                {mascotaActual && <button type="button" class="btn btn-secondary" onClick={resetFormulario}>Cancelar Edición</button>}
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-8">
                        <h2>Registro actual de mascotas</h2>
                            {/* <-- AÑADE ESTE BLOQUE DE CÓDIGO --> */}
    <div className="form-group">
        <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de mascota..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
        />
    </div>
    {/* <-- FIN DEL BLOQUE A AÑADIR --> */}
                    <div class="py-3 table-responsive">
                        <table class="table table-bordered ">
                        <thead class="thead-dark">
                            <tr>
                                <th>#</th>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Raza</th>
                            <th>Edad</th>
                            <th>Dueñ@</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mascotasFiltradas.map(mascota => (
                                
                            <tr key={mascota._id}>
                                <td><Link to={`/mascota/${mascota._id}`}><strong><small>Historial</small></strong></Link></td>
                            <td>{mascota.nombre}</td>
                            <td>{mascota.especie}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.edad}</td>
                            <td>{mascota.dueño.nombre}</td>
                            <td>{mascota.dueño.telefono}</td>
                            <td><div class="btn-group"> <button onClick={() => handleEditar(mascota)} class="btn btn-outline-warning"><small>Editar</small></button> <button onClick={() => handleEliminar(mascota._id)} class="btn btn-danger"><small>Eliminar</small></button> </div></td>
                            </tr>
                            ))}

                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        
    );
}

export default GestionMascotas;
