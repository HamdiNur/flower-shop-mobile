import { createContext, useContext } from 'react';
import { usePersistentState } from '../utils/usePersistentState';
const CartContext = createContext(null);

const DELIVERY_FEE = 5;
const FREE_DELIVERY_OVER = 50;

export function CartProvider({ children }) {
const [items, setItems, loaded] = usePersistentState('bloom:cart', []);
  const addToCart = (flowerId, sizeLabel, unitPrice, quantity) => {
    const key = `${flowerId}-${sizeLabel}`;

    setItems((current) => {
      const existing = current.find((item) => item.key === key);

      if (existing) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { key, flowerId, sizeLabel, unitPrice, quantity }];
    });
  };

  const increaseQuantity = (key) => {
    setItems((current) =>
      current.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (key) => {
    setItems((current) =>
      current.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee =
    items.length === 0 || subtotal > FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
<CartContext.Provider
  value={{
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    totalItems,
    loaded,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}