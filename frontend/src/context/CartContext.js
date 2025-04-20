import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  storeId: null
};

// Create context
const CartContext = createContext();

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload;
      
      // Safety check for product
      if (!product || !product._id) {
        console.error('Invalid product added to cart:', product);
        return state;
      }
      
      // Check if product already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.product && item.product._id === product._id
      );
      
      // If we're adding from a different store, clear the cart first
      if (state.storeId && state.storeId !== product.store && state.items.length > 0) {
        return {
          items: [{ product, quantity }],
          totalAmount: product.price * quantity,
          totalQuantity: quantity,
          storeId: product.store
        };
      }
      
      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount + (product.price * quantity),
          totalQuantity: state.totalQuantity + quantity
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { product, quantity }],
          totalAmount: state.totalAmount + (product.price * quantity),
          totalQuantity: state.totalQuantity + quantity,
          storeId: state.storeId || product.store
        };
      }
    }
      
    case 'REMOVE_FROM_CART': {
      const productId = action.payload;
      
      if (!productId) {
        console.error('Invalid product ID for removal:', productId);
        return state;
      }
      
      const itemIndex = state.items.findIndex(
        (item) => item.product && item.product._id === productId
      );
      
      if (itemIndex === -1) return state;
      
      const item = state.items[itemIndex];
      const updatedTotalAmount = state.totalAmount - (item.product.price * item.quantity);
      const updatedTotalQuantity = state.totalQuantity - item.quantity;
      
      // Remove the item
      const updatedItems = state.items.filter(
        (item) => item.product && item.product._id !== productId
      );
      
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalQuantity: updatedTotalQuantity,
        storeId: updatedItems.length > 0 ? state.storeId : null
      };
    }
      
    case 'UPDATE_QUANTITY': {
      const { id, qty } = action.payload;
      
      if (!id) {
        console.error('Invalid product ID for quantity update:', id);
        return state;
      }
      
      const itemToUpdateIndex = state.items.findIndex(
        (item) => item.product && item.product._id === id
      );
      
      if (itemToUpdateIndex === -1) return state;
      
      const itemToUpdate = state.items[itemToUpdateIndex];
      const qtyDifference = qty - itemToUpdate.quantity;
      
      // If qty is 0 or less, remove the item
      if (qty <= 0) {
        const updatedItems = state.items.filter(
          (item) => item.product && item.product._id !== id
        );
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - (itemToUpdate.product.price * itemToUpdate.quantity),
          totalQuantity: state.totalQuantity - itemToUpdate.quantity,
          storeId: updatedItems.length > 0 ? state.storeId : null
        };
      }
      
      // Update the quantity
      const updatedCartItems = [...state.items];
      updatedCartItems[itemToUpdateIndex].quantity = qty;
      
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount + (itemToUpdate.product.price * qtyDifference),
        totalQuantity: state.totalQuantity + qtyDifference
      };
    }
      
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) return initialState;
      
      const parsedCart = JSON.parse(savedCart);
      
      // Validate the cart structure
      if (!parsedCart || !Array.isArray(parsedCart.items)) {
        console.warn('Invalid cart data in localStorage, resetting to initial state');
        return initialState;
      }
      
      return parsedCart;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialState;
    }
  };
  
  const [cartState, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartState]);
  
  // Add to cart
  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id || !product.price) {
      console.error('Invalid product being added to cart:', product);
      return;
    }
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
  };
  
  // Remove from cart
  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid product ID for removal from cart');
      return;
    }
    
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };
  
  // Update quantity
  const updateQuantity = (id, qty) => {
    if (!id) {
      console.error('Invalid product ID for quantity update');
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, qty }
    });
  };
  
  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 