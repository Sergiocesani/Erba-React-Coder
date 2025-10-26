# 🛍️ Erba Perfumes - E-commerce en React + Firebase

## 📌 Descripción del Proyecto
Erba Perfumes es una tienda e-commerce desarrollada en **React** con integración a **Firebase (Firestore)**. Permite visualizar productos, filtrarlos por categoría, ver el detalle individual, agregar unidades al carrito, simular una compra y generar una orden que se almacena automáticamente en la base de datos de Firestore.

Este proyecto implementa conceptos avanzados de React como **Context API**, **React Router**, componentes contenedores/presentación y renderizado condicional.

---

## 🎯 Objetivo Académico
E-commerce desarrollada como **proyecto final** del curso de **React en Coderhouse**, Comisión **88070**, cumpliendo con todos los requerimientos de la etapa 3.

---

## 👨‍💻 Autor
**Sergio Damian Cesani**

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| React + Vite | Frontend de la aplicación |
| React Router DOM | Navegación entre vistas |
| Firebase Firestore | Base de datos y almacenamiento de órdenes |
| Context API | Gestión global del carrito de compras |
| CSS (custom) | Estilos personalizados para la UI |
| JavaScript (ESModules) | Lógica dinámica del proyecto |

---

## 🧱 Estructura principal del proyecto

├─ .gitignore
├─ eslint.config.js
├─index.html
├─ package-lock.json
├─ package.json
├─ vite.config.js
├─ README.md

dist/
node_modules

src/
├─ assets
├─ public
│ ├─ Image
├─ componentes/
│ ├─ CartWidget.jsx
│ ├─ ItemListContainer.jsx
│ ├─ ItemDetailContainer.jsx
│ ├─ ItemCount.jsx
│ ├─ Cart.jsx
│ ├─ CheckoutForm.jsx
  ├─ error404.jsx
  └─ navbar.jsx
├─ context/
│ └─ CartContext.jsx
├─ services/
│ └─ firebase.js
├─ data/
  ├─ api.js
│ ├─ productos.js (solo utilizado como mock inicial)
├─ App.jsx
├─ App.css
├─ main.jsx
└─ index.css

## 🛠️ Funcionalidades destacadas

✅ Conexión a Firebase para listar productos en tiempo real  
✅ Visualización de catálogo general y filtrado por categorías  
✅ Vista en detalle con selector de cantidad (ItemCount)  
✅ Carrito persistente mediante Context API  
✅ CartWidget muestra cantidad total de productos  
✅ Proceso de Checkout con formulario  
✅ Generación y almacenamiento de órdenes en Firestore con ID único  
✅ Renderizado condicional: carga, errores, sin stock, carrito vacío  
✅ Diseño responsive y estructura de componentes profesional  

Proyecto final de React - Coderhouse
Comisión: 88070
Alumno: Sergio Damian Cesani

📄 Licencia

Este proyecto es de uso educativo y académico.