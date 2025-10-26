import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, getDoc, doc,
  query, where, addDoc, serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpgDs-HPcxpNUB1dibprMy6HPosX_1AZQ",
  authDomain: "erba-perfumes.firebaseapp.com",
  projectId: "erba-perfumes",
  storageBucket: "erba-perfumes.firebasestorage.app",
  messagingSenderId: "304028236257",
  appId: "1:304028236257:web:2bb6ed504ec08ba21ebaa0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


function normalizeImage(url = "") {
  if (!url) return null; 
  if (url.startsWith("http")) return url; 
  if (url.startsWith("/")) return url; 
  return `/${url}`; 
}

// Mapeo de un documento Firestore a objeto de producto
function mapDoc(d) {
  const data = d.data();
  return {
    id: d.id,
    title: data.title,
    price: data.precio,
    category: (data.categoryid || "").toLowerCase(),
    image: normalizeImage(data.imagenid),
    description: data.descripcion,
    stock: data.stock ?? 0,
  };
}

function toLabel(categoryId) {
  if (!categoryId) return "";
  const map = { hombre: "Hombre", mujer: "Mujer", unisex: "Unisex" };
  return map[categoryId.toLowerCase()] ?? categoryId;
}

export async function fetchProducts(categoryId) {
  const ref = collection(db, "Perfume");
  let snap;
  if (categoryId) {
    snap = await getDocs(query(ref, where("categoryid", "==", toLabel(categoryId))));
  } else {
    snap = await getDocs(ref);
  }
  return snap.docs.map(mapDoc);
}

export async function fetchProductById(id) {
  const ref = doc(db, "Perfume", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Producto no encontrado");
  return mapDoc(snap);
}

export async function createOrder({ buyer, items, total }) {
  const ref = collection(db, "orders");
  const docRef = await addDoc(ref, {
    buyer,
    items,
    total,
    createdAt: serverTimestamp(),
    status: "generated"
  });
  return docRef.id;
}
