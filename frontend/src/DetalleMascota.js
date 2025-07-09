// frontend/src/DetalleMascota.js

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './estilos.css';

const host = 'petwellness-cvedf6efg5fsazgb.eastus2-01.azurewebsites.net';

function DetalleMascota() {
    const [mascota, setMascota] = useState(null);
    const [veterinarios, setVeterinarios] = useState([]);
    const [formData, setFormData] = useState({
        fecha: new Date().toISOString().split('T')[0],
        sintomas: '',
        diagnostico: '',
        id_veterinario: ''
    });
    const { id } = useParams();

    // ✅ PASO 1: La función está correctamente envuelta en useCallback.
    const cargarMascota = useCallback(async () => {
        try {
            const response = await axios.get(`https://${host}/api/mascotas/${id}`);
            setMascota(response.data);
        } catch (error) {
            console.error("Error al cargar la mascota:", error);
        }
    }, [id]);

    // ✅ PASO 2: Envuelve también esta función en useCallback.
    const cargarVeterinarios = useCallback(async () => {
        try {
            const response = await axios.get(`https://${host}/api/veterinarios`);
            setVeterinarios(response.data);
            if (response.data.length > 0) {
                setFormData(prevState => ({ ...prevState, id_veterinario: response.data[0]._id }));
            }
        } catch (error) {
            console.error("Error al cargar veterinarios:", error);
        }
    }, []); // <-- Dependencia vacía porque no usa variables externas.

    // ✅ PASO 3: Actualiza la lista de dependencias del useEffect.
    useEffect(() => {
        cargarMascota();
        cargarVeterinarios();
    }, [cargarMascota, cargarVeterinarios]); // <-- ¡Aquí está el cambio principal!


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`https://${host}/api/mascotas/${id}/consultas`, formData);
        cargarMascota();
        setFormData({
            fecha: new Date().toISOString().split('T')[0],
            sintomas: '',
            diagnostico: '',
            id_veterinario: veterinarios.length > 0 ? veterinarios[0]._id : ''
        });
    };

    if (!mascota) return <p>Cargando datos de la mascota...</p>;

    return (
        // ... tu JSX se queda exactamente igual ...
        <div className="detalle-container">
           <Link to="/" className="back-link">← Volver al listado</Link>
    
           <div class="container">
           <div class="row">
               <div class="col-md-12">
               <h1 class="pt-4"><b>Historial de: {mascota.nombre}</b></h1>
               </div>
           </div>
           </div>

            {mascota.imagen && (
                <div className="text-center my-3">
                    {/* Simplemente usa el string Base64 como src */}
                    <img src={mascota.imagen} alt={mascota.nombre} style={{width: '200px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}} />
                </div>
            )}
       
        <div class="py-3 text-center">
            <div class="container">
            <div class="row">
                <div class="mx-auto col-lg-7">
                <h1 class="mb-4">Registrar nueva consulta</h1>
                <form onSubmit={handleSubmit}>
                    <div class="form-group"> <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} class="form-control"/> </div>
                    <div class="form-group"> <textarea class="form-control" rows="3" name="sintomas" value={formData.sintomas} onChange={handleChange} placeholder="Sintomas"></textarea> </div>
                    <div class="form-group"> <textarea class="form-control" rows="3" name="diagnostico" value={formData.diagnostico} onChange={handleChange} placeholder="Diagnostico"></textarea> </div>
                    <select name="id_veterinario" class="form-control" value={formData.id_veterinario} onChange={handleChange} required>
                            {veterinarios.map(vet => (
                                <option key={vet._id} value={vet._id}>{vet.nombre_completo}</option>
                            ))}
                        </select>
                    <button type="submit" class="btn btn-dark">Registrar Consulta</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        
            <div class="container">
            <div class="row">
                {mascota.consultas.length > 0 ? (
                    mascota.consultas.map((consulta, index) => (
                <div key={index} class="col-md-6">
                <div class="py-2">
                    <div class="card text-center">
                    <div class="card-header"> {mascota.nombre} </div>
                    <div class="card-body">
                        <p class="card-text"><strong>Síntomas:</strong> {consulta.sintomas}</p>
                        <p class="card-text"><strong>Diagnóstico:</strong> {consulta.diagnostico}</p>
                    </div>
                    <div class="card-footer text-muted">Fecha: {new Date(consulta.fecha).toLocaleDateString()} </div>
                    </div>
                </div>
                </div>
                            ))
                ) : (
                    <p>No hay consultas registradas.</p>
                )}
            </div>
            </div>
    
            
   </div>
    );
}

export default DetalleMascota;
