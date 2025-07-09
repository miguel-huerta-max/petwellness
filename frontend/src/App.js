// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Importa TODOS tus componentes de página
import GestionMascotas from './GestionMascotas';
import GestionVeterinarios from './GestionVeterinarios';
import HomePage from './HomePage';
import DetalleMascota from './DetalleMascota'; // <-- 1. IMPORTA EL COMPONENTE FALTANTE

import './estilos.css';

function App() {
    return (
        <Router>
            <div className="App">
                  <nav class="navbar navbar-expand-md navbar-dark bg-dark" >
                      <div class="container"> <div class="navbar-brand">
                          <i class="fa d-inline fa-lg fa-paw"></i>
                          <b> PetWellness</b>
                        </div> <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar10">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbar10">
                          <ul class="navbar-nav ml-auto">
                          <li class="nav-item"> <Link class="nav-link" to="/">Inicio</Link> </li>
                            <li class="nav-item"> <Link class="nav-link" to="/mascotas">Mascotas</Link> </li>
                            <li class="nav-item"> <Link class="nav-link" to="/veterinarios">Veterinarios</Link> </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/mascotas" element={<GestionMascotas />} />
                        
                        {/* ✅ 2. AÑADE ESTA LÍNEA PARA LA RUTA DE DETALLES */}
                        <Route path="/mascota/:id" element={<DetalleMascota />} />

                        <Route path="/veterinarios" element={<GestionVeterinarios />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
