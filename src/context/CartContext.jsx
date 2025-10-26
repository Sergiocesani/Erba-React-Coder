import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [] 
};

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

  const value = { ...state, addItem, removeItem, clearCart, totalUnits, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
