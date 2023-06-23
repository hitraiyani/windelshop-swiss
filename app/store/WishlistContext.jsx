import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productCompareItems, setproductCompareItems] = useState([]);

  useEffect(() => {
    const storedWishlistItems = localStorage.getItem('wishlistItems');
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
    const productCompareItems = localStorage.getItem('productCompareItems');
    if (productCompareItems) {
      setproductCompareItems(JSON.parse(productCompareItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('productCompareItems', JSON.stringify(productCompareItems));
  }, [productCompareItems]);

  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item !== itemId)
    );
  };

  const addToProductCompare = (item) => {
    setproductCompareItems((prevItems) => {
      // Remove the oldest element if the array has reached the maximum length
      if (prevItems.length === 4) {
        prevItems.shift(); // Remove the first element (oldest)
      }
      // Add the new item to the end of the array
      return [...prevItems, item];
    });
  };

  const removeFromProductCompare = (itemId) => {
    setproductCompareItems((prevItems) =>
      prevItems.filter((item) => item !== itemId)
    );
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        productCompareItems,
        addToProductCompare,
        removeFromProductCompare
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};