// frontend/src/GestionMascotas.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilos.css'; // Crearemos este archivo para los estilos

const API_URL = '/api/mascotas';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mascotaActual) {
            // Actualizar
            await axios.put(`${API_URL}/${mascotaActual._id}`, formData);
        } else {
            // Crear
            await axios.post(API_URL, formData);
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
                            <td><div class="btn-group"> <a onClick={() => handleEditar(mascota)} class="btn btn-outline-warning"><small>Editar</small></a> <a onClick={() => handleEliminar(mascota._id)} class="btn btn-danger"><small>Eliminar</small></a> </div></td>
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