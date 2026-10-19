import { createContext, useContext } from 'react';
import { usePersistentState } from '../utils/usePersistentState';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
const [orders, setOrders, loaded] = usePersistentState('bloom:orders', []);
  const addOrder = (order) => {
    setOrders((current) => [order, ...current]);
  };

  const clearOrders = () => setOrders([]);

  return (
<OrdersContext.Provider value={{ orders, addOrder, clearOrders, loaded }}>
          {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used inside OrdersProvider');
  }
  return context;
}