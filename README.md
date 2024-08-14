# Proyecto Final - Backend

Este es el proyecto final para el curso de Backend de Coderhouse, desarrollado por **Ian Franco Collada Pontorno**. El proyecto consiste en una API RESTful que permite la gestión de productos y carritos de compras, utilizando MongoDB como base de datos principal.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express**: Framework para Node.js, utilizado para construir la API.
- **MongoDB**: Base de datos NoSQL, utilizada para la persistencia de datos.
- **Mongoose**: ODM (Object Data Modeling) para trabajar con MongoDB en Node.js.
- **Handlebars**: Motor de plantillas para la creación de vistas dinámicas.
- **Socket.IO**: Biblioteca que permite la comunicación en tiempo real entre el servidor y el cliente.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **models/**: Contiene los modelos de Mongoose para `Product` y `Cart`.
- **routes/**: Contiene las rutas de la API para productos (`products.js`) y carritos (`carts.js`).
- **views/**: Contiene las vistas en Handlebars para visualizar los productos y carritos.
- **public/**: Contiene archivos estáticos como CSS y JS.
- **server.js**: Archivo principal que configura y arranca el servidor.

## Endpoints de la API

### Productos

- `GET /api/products/`: Obtiene todos los productos con soporte para filtros, paginación y ordenamiento.
- `GET /api/products/:pid`: Obtiene un producto por su ID.
- `POST /api/products/`: Crea un nuevo producto.
- `PUT /api/products/:pid`: Actualiza un producto existente por su ID.
- `DELETE /api/products/:pid`: Elimina un producto por su ID.

### Carritos

- `POST /api/carts/`: Crea un nuevo carrito.
- `GET /api/carts/:cid`: Obtiene un carrito por su ID.
- `POST /api/carts/:cid/product/:pid`: Añade un producto al carrito.
- `DELETE /api/carts/:cid/products/:pid`: Elimina un producto específico del carrito.
- `DELETE /api/carts/:cid`: Elimina todos los productos de un carrito.

## Vistas

### Productos

- `/home`: Muestra una lista de todos los productos.
- `/realtimeproducts`: Muestra los productos en tiempo real con la posibilidad de agregar o eliminar productos.

### Carritos

- `/carts/:cid`: Muestra los productos en un carrito específico.

## Instalación y Ejecución

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Ian9Franco/Segunda-entrega-java-Ian-franco-collada-pontorno
    ```

2. Instala las dependencias:
    ```bash
    cd nombre-del-repositorio
    npm install
    ```

3. Configura la base de datos en MongoDB.

4. Ejecuta el servidor:
    ```bash
    npm start
    ```

5. Accede a la aplicación en `http://localhost:3000`.

## Notas

- La lógica del negocio no ha sido modificada, sólo la persistencia en la base de datos.
- Los nuevos endpoints siguen la estructura y lógica establecidas en el proyecto anterior.

## Contribuciones

Este proyecto es parte del curso de Backend de Coderhouse, por lo que no se aceptan contribuciones externas.

## Autor

**Ian Franco Collada Pontorno** - [GitHub](https://github.com/Ian9Franco) - [Portfolio](https://ian9franco.github.io/Portfolio/)
