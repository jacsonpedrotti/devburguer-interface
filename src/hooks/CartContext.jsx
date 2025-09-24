import React from "react";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function addProduct(product) {
    setCartProducts((prevProducts) => {
      const productExists = prevProducts.find((p) => p.id === product.id);
      if (productExists) {
        // Atualiza quantidade
        return prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevProducts, { ...product, quantity: 1 }];
    });
  }

  function increaseProduct(productId) {
    setCartProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  }

  function decreaseProduct(productId) {
    setCartProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId) {
          if (p.quantity === 1) {
            return null; // Remove o produto se quantidade for 1
          }
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      }).filter(Boolean) // Remove os nulls
    );
  }

  function deleteProduct(productId) {
    setCartProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  }

  function removeProduct(productId) {
    setCartProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== productId)
    );
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{ 
        cartProducts, 
        addProduct, 
        increaseProduct, 
        decreaseProduct, 
        deleteProduct, 
        removeProduct, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
