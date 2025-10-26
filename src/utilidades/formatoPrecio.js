export function formatoPrecio(numero) {
  if (!numero && numero !== 0) return "$0";
  // Formato argentino: separador de miles con punto
  return `$${numero.toLocaleString("es-AR")}`;
}