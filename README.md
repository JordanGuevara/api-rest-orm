# API RESTful: Sistema de Gestión de Biblioteca (Node.js + Mongoose)

## Introducción

Este proyecto es una **API RESTful** desarrollada con **Node.js** y el *framework* **Express**, diseñada para gestionar los datos de una biblioteca. Utiliza **MongoDB** como base de datos NoSQL y **Mongoose** como Object Data Modeling (ODM) para definir esquemas y manejar las relaciones de datos.

La API implementa las operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para tres recursos principales: **Autores**, **Géneros** y **Libros**.

## Tecnologías y Dependencias

Para la ejecución del proyecto, se instalaron las siguientes dependencias clave mediante `npm install`:

| Dependencia | Propósito |
| :--- | :--- |
| **express** | *Framework* principal para construir la aplicación web y el *routing*. |
| **mongoose** | ODM (Object Data Modeling) para interactuar con MongoDB, definir esquemas y manejar relaciones (`populate`). |
| **dotenv** | (Recomendado) Para cargar variables de entorno (como la URL de MongoDB) desde un archivo `.env`. |

## Estructura del Proyecto

Se adoptó una estructura modular que integra las funciones de control (`handler` CRUD) directamente dentro de los archivos de rutas, lo cual simplifica la arquitectura al eliminar la carpeta `controllers`.


## Instalación y Ejecución

Sigue estos pasos para levantar el servidor localmente:

### 1. Requisitos Previos

* Tener **Node.js** instalado.
* Tener una instancia de **MongoDB** (local o en la nube, como Atlas) en ejecución.

### 2. Configuración

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `db.js` en la cual se define la URL de tu base de datos :
    ```env
    PORT=3000
    MONGODB_URI="mongodb://localhost:27017/biblioteca_db"
    ```

### 3. Ejecución

1.  Inicia la aplicación:
    ```bash
    node src/index.js
    nodemon: nodemon src/index.js
    ```
2.  El servidor estará activo en `http://localhost:3000`.

## Documentación de Endpoints

Todos los *endpoints* están prefijados con `/api`. El puerto por defecto es `3000`.

### Recurso: Autores (`/api/autores`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- | 
| **POST** | `/api/autores` | Crea un nuevo autor. |
| **GET** | `/api/autores` | Obtiene todos los autores. | 
| **GET** | `/api/autores/:id` | Obtiene un autor específico por su ID. |
| **PUT** | `/api/autores/:id` | Actualiza un autor por su ID. |
| **DELETE**| `/api/autores/:id` | Elimina un autor por su ID. |

### Recurso: Géneros (`/api/generos`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/generos` | Crea un nuevo género. |
| **GET** | `/api/generos` | Obtiene todos los géneros. |
| **GET** | `/api/generos/:id` | Obtiene un género específico por su ID. |
| **PUT** | `/api/generos/:id` | Actualiza un género por su ID. |
| **DELETE**| `/api/generos/:id` | Elimina un género por su ID. |

### Recurso: Libros (`/api/libros`)

Este recurso utiliza **`.populate()`** en las consultas GET para devolver los datos completos de **Autor** y **Género** en lugar de solo sus IDs.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/libros` | Crea un nuevo libro. |
| **GET** | `/api/libros` | Obtiene todos los libros con detalles de Autor y Género. |
| **GET** | `/api/libros/:id` | Obtiene un libro específico por su ID con detalles de Autor y Género. |
| **GET** | `/api/libros/autor/:id` | **BUSCA:** Obtiene todos los libros asociados a un Autor por su ID. |
| **GET** | `/api/libros/genero/:id`| **BUSCA:** Obtiene todos los libros asociados a un Género por su ID. |
| **PUT** | `/api/libros/:id` | Actualiza un libro por su ID. |
| **DELETE**| `/api/libros/:id` | Elimina un libro por su ID. |

## Conclusiones del Proyecto

Esta API demuestra la implementación exitosa de una solución *backend* que integra **Express** para el *routing* eficiente y **Mongoose** para la gestión de la persistencia de datos relacionales en un entorno NoSQL (MongoDB). Se validó la funcionalidad CRUD completa, destacando la capacidad de `.populate()` para resolver referencias de manera limpia y concisa, cumpliendo con los requisitos de un sistema de gestión de datos modular y robusto.
