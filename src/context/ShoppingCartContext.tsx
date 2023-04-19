import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  toggleCart: () => void;
  //   closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems:CardItem[]
};
type CardItem = {
  id: number;
  quantity: number;
};

const ShoppingCardContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
  return useContext(ShoppingCardContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CardItem[]>([]);
  const [slideCart, setSlideCart] = useState<boolean>(false);

  const toggleCart = () => {
    setSlideCart(!slideCart);
  };
  const cartQuantity= cartItems.reduce((quantity,item)=>item?.quantity+quantity,0)

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => +item?.id === +id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setCartItems((oldData) => {
      if (oldData.find((item) => +item?.id === +id) == null) {
        return [...oldData, { id, quantity: 1 }];
      } else {
        return oldData.map((item) => {
          if (+item?.id === +id) {
            return { ...item, quantity: item?.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((oldData) => {
      if (oldData.find((item) => +item?.id === +id)?.quantity === 1) {
        return oldData.filter((item) => item?.id !== id);
      } else {
        return oldData.map((item) => {
          if (+item?.id === +id && item?.quantity !== 0) {
            return { ...item, quantity: item?.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((oldData) => {
      if (oldData.find((item) => +item?.id === +id)) {
        return oldData.filter((item) => item?.id !== id);
      } else {
        return oldData;
      }
    });
  };

  return (
    <ShoppingCardContext.Provider
      value={{
        cartQuantity,
        cartItems,
        toggleCart,
        increaseCartQuantity,
        getItemQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
      <ShoppingCart  slideCart={slideCart}/>
    </ShoppingCardContext.Provider>
  );
}
