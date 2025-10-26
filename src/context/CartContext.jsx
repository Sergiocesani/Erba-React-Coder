import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();

const initialState = { items: [] };

function itemKey(i) {
  return `${i.id}${i.size ? `|${i.size}` : ""}`;
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, quantity } = action.payload;
      const key = itemKey(item);
      const exists = state.items.find(i => itemKey(i) === key);

      let next;
      if (exists) {
        next = state.items.map(i =>
          itemKey(i) === key
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) }
            : i
        );
      } else {
        next = [...state.items, { ...item, quantity }];
      }
      return { ...state, items: next };
    }

    case "DECREMENT": {
      const { id, size } = action.payload;
      const key = `${id}${size ? `|${size}` : ""}`;
      const target = state.items.find(i => itemKey(i) === key);
      if (!target) return state;

      const next =
        target.quantity > 1
          ? state.items.map(i =>
              itemKey(i) === key ? { ...i, quantity: i.quantity - 1 } : i
            )
          : state.items.filter(i => itemKey(i) !== key);

      return { ...state, items: next };
    }

    case "REMOVE": {
      const { id, size } = action.payload;
      const key = `${id}${size ? `|${size}` : ""}`;
      return { ...state, items: state.items.filter(i => itemKey(i) !== key) };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

 
  const addItem = (item, quantity) =>
    dispatch({ type: "ADD", payload: { item, quantity } });

  const decrementItem = (id, size) =>
    dispatch({ type: "DECREMENT", payload: { id, size } });

  const removeItem = (id, size) =>
    dispatch({ type: "REMOVE", payload: { id, size } });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalUnits = useMemo(
    () => state.items.reduce((acc, i) => acc + i.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [state.items]
  );

  const value = {
    ...state,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    totalUnits,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);