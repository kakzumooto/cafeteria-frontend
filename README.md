# ☕ Aroma Borealis - E-commerce de Café

Plataforma de comercio electrónico Full Stack para la venta de café de especialidad y accesorios. Incluye gestión de inventario, carrito de compras, autenticación segura y panel de administración.



## 🚀 Tecnologías Utilizadas

* **Frontend:** React, Vite, CSS3 (Responsive Design).
* **Backend:** Java, Spring Boot, Spring Security (JWT).
* **Base de Datos:** MySQL.
* **Herramientas:** Postman, Git.

## ✨ Funcionalidades Principales

1.  **Catálogo Público:** Visualización de productos con imágenes y control de stock.
2.  **Autenticación y Seguridad:** Login y Registro con JWT (JSON Web Tokens) y roles (USER/ADMIN).
3.  **Carrito de Compras:** Lógica de agregar, sumar totales y validar existencias.
4.  **Panel de Administración (Protegido):**
    * CRUD completo de productos (Crear, Leer, Actualizar, Borrar).
    * Gestión de imágenes y stock en tiempo real.
5.  **Diseño Responsive:** Adaptable a dispositivos móviles y escritorio.

---

## 🧪 Credenciales de Demo (Para Pruebas)

Si descargas y ejecutas el proyecto localmente, puedes usar estos usuarios pre-configurados (asegúrate de crearlos en tu base de datos o ejecutar el script SQL adjunto):

### 👤 Usuario Administrador (Acceso Total)
* **Email:** `jefe@aroma.com`
* **Password:** `12345`
* **Rol:** `ROLE_ADMIN` (Permite ver el botón "Panel Admin" y editar productos).

### 👤 Usuario Cliente
* **Email:** `cliente@aroma.com`
* **Password:** `12345`
* **Rol:** `ROLE_USER` (Solo puede comprar y ver sus pedidos).

---

## ⚙️ Instalación y Ejecución

### Prerrequisitos
* Java JDK 17+
* Node.js & npm
* MySQL

### Pasos
1.  Clonar el repositorio.
2.  Configurar la base de datos en `application.properties`.
3.  Ejecutar Backend: `./mvnw spring-boot:run`
4.  Ejecutar Frontend: `npm install` y luego `npm run dev`.

---

Developed by Héctor zacapala - Ingeniero en Sistemas