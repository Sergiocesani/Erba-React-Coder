import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, getDoc, doc,
  query, where, addDoc, serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function normalizeImage(url = "") {
  if (!url) return null;
  const u = String(url).trim();
  if (!u) return null;
  if (u.startsWith("http")) return u;  
  if (u.startsWith("/")) return u;     
  return `/${u}`;                      
}

function mapDoc(d) {
  const data = d.data();

 
  const rawImg = data.imagenid ?? data.imageid ?? data.img ?? data.image ?? null;
  const rawPrice = data.precio ?? data.price ?? data.Precio ?? 0;
  const rawDesc = data.descripcion ?? data.description ?? data.Descripcion ?? "";
  const rawCat  = data.categoryid ?? data.category ?? "";


  const sizes = Array.isArray(data.sizes)
    ? data.sizes.map((s) => ({
        label: String(s?.label ?? s?.tamano ?? s?.size ?? "").trim(),
        price: Number(s?.price ?? s?.precio ?? 0),
        stock: Number(s?.stock ?? 0),
        image: normalizeImage(s?.image ?? s?.imagen ?? ""),
      }))
    : null;

  return {
    id: d.id,
    title: data.title,
    price: Number(rawPrice),                  // precio base (si no hay sizes)
    category: String(rawCat || "").toLowerCase(),
    image: normalizeImage(rawImg),
    description: rawDesc,
    stock: Number(data.stock ?? 0),
    sizes,                                   
  };
}

function toLabel(categoryId) {
  if (!categoryId) return "";
  const map = { hombre: "Hombre", mujer: "Mujer", unisex: "Unisex" };
  return map[categoryId.toLowerCase()] ?? categoryId;
}

export async function fetchProducts(categoryId) {
  const ref = collection(db, "Perfume");
  const snap = categoryId
    ? await getDocs(query(ref, where("categoryid", "==", toLabel(categoryId))))
    : await getDocs(ref);

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
    status: "generated",
  });
  return docRef.id;
}
