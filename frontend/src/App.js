// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importa Link
import GestionMascotas from './GestionMascotas';
import DetalleMascota from './DetalleMascota';
import GestionVeterinarios from './GestionVeterinarios'; // ¡Importa el nuevo componente!
import './estilos.css';

function App() {
    return (
        <Router>
            <div className="App">
                  <nav class="navbar navbar-expand-md navbar-dark bg-dark" >
                    <div class="container"> <a class="navbar-brand" href="#">
                        <i class="fa d-inline fa-lg fa-paw"></i>
                        <b> PetWellness</b>
                      </a> <button class="navbar-toggler navbar-toggler-right border-0" type="button" data-toggle="collapse" data-target="#navbar10">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      <div class="collapse navbar-collapse" id="navbar10">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item"> <Link class="nav-link" to="/">Mascotas</Link> </li>
                          <li class="nav-item"> <Link class="nav-link" to="/veterinarios">Veterinarios</Link> </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<GestionMascotas />} />
                        <Route path="/mascota/:id" element={<DetalleMascota />} />
                        <Route path="/veterinarios" element={<GestionVeterinarios />} /> {/* ¡Añade la nueva ruta! */}
                    </Routes>
                </main>
            </div>

        </Router>
    );
}

export default App;