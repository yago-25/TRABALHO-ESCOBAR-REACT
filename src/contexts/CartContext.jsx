/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartProducts")) || [];
    setCartItems(stored);
  }, []);

  const addToCart = (product) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem("cartProducts", JSON.stringify(updated));
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((product) => product._id !== productId);
    setCartItems(updated);
    localStorage.setItem("cartProducts", JSON.stringify(updated));
  };

  const removeAllFromCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartProducts");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeAllFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
