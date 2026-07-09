import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleWishlist = (property) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === property.id);
      if (exists) {
        return prev.filter((item) => item.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const toggleCompare = (property) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === property.id);
      if (exists) {
        return prev.filter((item) => item.id !== property.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 properties at a time.');
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  const isInCompareList = (id) => {
    return compareList.some((item) => item.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompareList,
        clearCompare,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
