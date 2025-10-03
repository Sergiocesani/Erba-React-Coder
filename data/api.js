import { PRODUCTOS } from "./productos";

// Simula latencia
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts(categoryId) {
  await delay(600);
  if (!categoryId) return PRODUCTOS;
  return PRODUCTOS.filter((p) => p.category === categoryId);
}

export async function getProductById(id) {
  await delay(600);
  const prod = PRODUCTOS.find((p) => p.id === id);
  if (!prod) throw new Error("Producto no encontrado");
  return prod;
}
