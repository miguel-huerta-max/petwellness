// frontend/src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './estilos.css'; // Usaremos el CSS mejorado

function HomePage() {
    return (
        // Contenedor principal con una clase para el fondo
        <div className="home-background">
            {/* Hero Banner: La sección de bienvenida principal */}
            <div className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">PetWellness</h1>
                    <p className="hero-subtitle">Cuidando a quienes más quieres, con la tecnología de nuestro lado.</p>
                </div>
            </div>

            {/* Contenedor para el contenido principal de la página */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    {/* Tarjeta para la misión */}
                    <div className="col-md-8">
                        <div className="card text-center shadow-lg mb-5">
                            <div className="card-body">
                                <h2 className="card-title">Nuestra Misión</h2>
                                <p className="card-text">
                                    En PetWellness, nuestra misión es simplificar la administración de las clínicas veterinarias para que los profesionales puedan dedicar más tiempo a lo que realmente importa: la salud y el bienestar de las mascotas. Creemos que la digitalización de los historiales clínicos no solo optimiza el tiempo, sino que también mejora la calidad del cuidado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de llamada a la acción (CTA) */}
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="cta-title">Comienza a Administrar tu Clínica</h2>
                        <p className="lead text-muted">Accede a nuestras herramientas de gestión para un control total.</p>
                        <div className="cta-buttons mt-4">
                            <Link to="/mascotas" className="btn btn-primary btn-lg mx-2">
                                🐾 Gestionar Mascotas
                            </Link>
                            <Link to="/veterinarios" className="btn btn-secondary btn-lg mx-2">
                                👨‍⚕️ Gestionar Veterinarios
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
