// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, quantity } = action.payload;
      const exists = state.items.find(i => i.id === item.id);
      let next;
      if (exists) {
        next = state.items.map(i =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) }
            : i
        );
      } else {
        next = [...state.items, { ...item, quantity }];
      }
      return { ...state, items: next };
    }
    case "DECREMENT": {
      const id = action.payload;
      const target = state.items.find(i => i.id === id);
      if (!target) return state;
      // si queda 1, al decrementar se elimina del carrito
      const next =
        target.quantity > 1
          ? state.items.map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
          : state.items.filter(i => i.id !== id);
      return { ...state, items: next };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item, quantity) => dispatch({ type: "ADD", payload: { item, quantity } });
  const decrementItem = (id) => dispatch({ type: "DECREMENT", payload: id });
  const removeItem = (id) => dispatch({ type: "REMOVE", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalUnits = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity, 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () => state.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [state.items]
  );

  const value = { ...state, addItem, decrementItem, removeItem, clearCart, totalUnits, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
