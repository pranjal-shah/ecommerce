import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Listen for cart update from backend
    socket.on("cart-updated", (count) => {
      console.log("Cart count updated from server:", count);
      setCartCount(count);
    });

    // Cleanup listener when context unmounts
    return () => {
      socket.off("cart-updated");
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
