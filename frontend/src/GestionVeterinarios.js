// frontend/src/GestionVeterinarios.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilos.css'; // ¡Reutilizaremos los mismos estilos!

const API_URL = 'https://petwellness-cvedf6efg5fsazgb.eastus2-01.azurewebsites.net/api/veterinarios';

function GestionVeterinarios() {
    const [veterinarios, setVeterinarios] = useState([]);
    const [veterinarioActual, setVeterinarioActual] = useState(null);
    const [formData, setFormData] = useState({
        nombre_completo: '',
        especialidad: '',
        cedula_profesional: ''
    });

    useEffect(() => {
        cargarVeterinarios();
    }, []);

    const cargarVeterinarios = async () => {
        const response = await axios.get(API_URL);
        setVeterinarios(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (veterinarioActual) {
            await axios.put(`${API_URL}/${veterinarioActual._id}`, formData);
        } else {
            await axios.post(API_URL, formData);
        }
        resetFormulario();
        cargarVeterinarios();
    };

    const handleEditar = (veterinario) => {
        setVeterinarioActual(veterinario);
        setFormData({
            nombre_completo: veterinario.nombre_completo,
            especialidad: veterinario.especialidad,
            cedula_profesional: veterinario.cedula_profesional
        });
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro?')) {
            await axios.delete(`${API_URL}/${id}`);
            cargarVeterinarios();
        }
    };

    const resetFormulario = () => {
        setVeterinarioActual(null);
        setFormData({ nombre_completo: '', especialidad: '', cedula_profesional: '' });
    };

    return (

        <div class="py-5" >
            <div class="container">
            <div class="row">
                <div class="col-md-4">
                <div class="text-center">
                    <div class="container">
                    <div class="row">
                        <div class="">
                            <h2>{veterinarioActual ? 'Editar Veterinario' : 'Registrar Veterinario'}</h2>
                        <form class="text-left" onSubmit={handleSubmit}>
                            <div class="form-group"> <input type="text" class="form-control" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} placeholder="Nombre del veterinario" required autoComplete='off'/> </div>
                            <div class="form-group"> <input type="text" class="form-control" name="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Especialidad" required autoComplete='off'/> </div>
                            <div class="form-group"> <input type="text" class="form-control" name="cedula_profesional" value={formData.cedula_profesional} onChange={handleChange} placeholder="Cédula Profesional" required autoComplete='off'/> </div>
                            <button type="submit" class="btn btn-success">{veterinarioActual ? 'Actualizar' : 'Crear'}</button>
                            {veterinarioActual && <button type="button" class="btn btn-secondary" onClick={resetFormulario}>Cancelar Edición</button>}
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="col-md-8">
                    <h2>Registro actual de mascotas</h2>
                <div class="py-3 table-responsive">
                    <table class="table table-bordered ">
                    <thead class="thead-dark">
                        <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Cédula</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veterinarios.map(vet => (
                        <tr key={vet._id}>
                        <td>{vet.nombre_completo}</td>
                        <td>{vet.especialidad}</td>
                        <td>{vet.cedula_profesional}</td>
                        <td><div class="btn-group"> <button onClick={() => handleEditar(vet)} class="btn btn-outline-warning"><small>Editar</small></button> <button onClick={() => handleEliminar(vet._id)} class="btn btn-danger"><small>Eliminar</small></button> </div></td>
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

export default GestionVeterinarios;
