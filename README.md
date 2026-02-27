
# Front-End UTN BackEnd

Este proyecto es la interfaz front-end de la replica de la aplicacion slack

## ¿Qué hace este proyecto?

Permite a los usuarios:

- Registrarse y autenticarse en la plataforma.
- Crear y gestionar espacios de trabajo (workspaces).
- Invitar miembros a los espacios de trabajo.
- Enviar y recibir mensajes en canales de comunicación.
- Visualizar y administrar canales y mensajes.

La aplicación está construida con React y utiliza Vite para el desarrollo y la compilación. Se conecta con un back-end para manejar la autenticación, la gestión de usuarios, canales, mensajes y workspaces.

## Estructura principal

- Screens: Vistas principales de la aplicación (Login, Registro, Home, WorkSpace).
- Context: Contextos globales para manejar autenticación, canales, mensajes y workspaces.
- hooks: Hooks personalizados para lógica de formularios, autenticación, creación de workspaces, etc.
- services: Servicios para interactuar con la API del back-end.
- utils: Utilidades y helpers.

## Instalación y ejecución

1. Instala dependencias:
	npm install
2. Ejecuta el proyecto en modo desarrollo:
	npm run dev


