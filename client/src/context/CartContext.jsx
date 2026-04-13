import { createContext, useEffect, useState } from "react";

const CART_ITEMS_KEY = "shopzen_cart_items";
const CHECKOUT_KEY = "shopzen_checkout_details";
const LAST_ORDER_KEY = "shopzen_last_order";

const readJson = (key, fallback) => {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
};

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readJson(CART_ITEMS_KEY, []));
  const [checkoutDetails, setCheckoutDetailsState] = useState(() =>
    readJson(CHECKOUT_KEY, null)
  );
  const [lastOrder, setLastOrderState] = useState(() =>
    readJson(LAST_ORDER_KEY, null)
  );

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (checkoutDetails) {
      localStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutDetails));
      return;
    }

    localStorage.removeItem(CHECKOUT_KEY);
  }, [checkoutDetails]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(lastOrder));
      return;
    }

    localStorage.removeItem(LAST_ORDER_KEY);
  }, [lastOrder]);

  const addToCart = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQuantity = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.productId !== productId)
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const setCheckoutDetails = (details) => {
    setCheckoutDetailsState(details);
  };

  const setLastOrder = (payload) => {
    setLastOrderState(payload);
  };

  const clearLastOrder = () => {
    setLastOrderState(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    checkoutDetails,
    lastOrder,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCheckoutDetails,
    setLastOrder,
    clearLastOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
