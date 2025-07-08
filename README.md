🐾 PetWellness - Administración Veterinaria
PetWellness es una aplicación web simple y moderna diseñada para ayudar a las clínicas veterinarias a digitalizar y gestionar los registros de sus pacientes de forma eficiente.

Tabla de Contenidos
Descripción del Proyecto

Características Principales

Tecnologías Utilizadas

Estructura del Proyecto

Instalación y Puesta en Marcha

Despliegue

## Descripción del Proyecto
El objetivo de PetWellness es ofrecer una plataforma intuitiva donde los veterinarios puedan abandonar los registros en papel y adoptar un sistema digital. La aplicación permite realizar un seguimiento completo de las mascotas, sus dueños y su historial clínico, todo desde una interfaz web clara y accesible.

## Características Principales
Gestión de Mascotas: Funcionalidad CRUD (Crear, Leer, Actualizar, Borrar) completa para los registros de las mascotas.

Gestión de Veterinarios: CRUD completo para administrar al personal médico de la clínica.

Historial Clínico: Posibilidad de añadir y visualizar consultas (síntomas, diagnóstico) asociadas a cada mascota.

Búsqueda en Tiempo Real: Filtra y busca mascotas por nombre de forma instantánea.

Interfaz Responsiva: Diseño adaptable que funciona tanto en computadoras de escritorio como en tablets.

## Tecnologías Utilizadas
Frontend: React.js, React Router, Axios

Backend: Node.js, Express

Base de Datos: MongoDB (con Mongoose)

Despliegue: Azure App Service

Control de Versiones: Git y GitHub

## Estructura del Proyecto
Este proyecto utiliza una arquitectura de monorepo para mantener el frontend y el backend organizados en un solo lugar.

/
├── backend/        # Contiene el servidor de Node.js y la API
│   ├── models/
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   └── .env
└── frontend/       # Contiene la aplicación de React
    ├── public/
    ├── src/
    ├── node_modules/
    ├── package.json
    └── ...
## Instalación y Puesta en Marcha
Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

Prerrequisitos
Node.js (v18 o superior)

npm

Una instancia de MongoDB (local o en la nube como MongoDB Atlas)

1. Clona el repositorio
Bash

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
2. Configura el Backend
Bash

# Navega a la carpeta del backend
cd backend

# Instala las dependencias
npm install

# Crea un archivo .env y añade tu cadena de conexión a MongoDB
touch .env
Abre el archivo .env y añade tu MONGO_URI:

MONGO_URI=mongodb+srv://tu_usuario:<password>@tu_cluster.mongodb.net/petwellness_db?retryWrites=true&w=majority
Bash

# Inicia el servidor de backend (en http://localhost:5000)
npm run start:dev
3. Configura el Frontend
Abre una nueva terminal.

Bash

# Navega a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Inicia la aplicación de React (en http://localhost:3000)
npm start
¡Y listo! La aplicación debería estar funcionando en tu máquina local.

## Despliegue
Este proyecto está configurado para ser desplegado en Azure App Service. La estrategia de despliegue consiste en construir la aplicación de React y servir los archivos estáticos resultantes desde el mismo servidor de Node.js, permitiendo que todo funcione en un único servicio.