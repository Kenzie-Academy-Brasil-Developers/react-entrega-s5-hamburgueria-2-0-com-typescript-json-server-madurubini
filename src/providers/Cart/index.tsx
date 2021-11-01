import { createContext, ReactNode, useContext, useState } from "react";
import api from "../../services/api";
import { useUsers } from "../User";

interface CartProps {
  children: ReactNode;
}

interface CartProviderData {
  getCart: () => void;
  myProducts: any;
  addToCart: (item: ProductData) => void;
  removeFromCart: (id: number) => void;
}

interface ProductData {
  code: number;
  title: string;
  price: number;
  img: string;
  description: string;
  userId?: number;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProps) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  const [myProducts, setMyProducts] = useState<ProductData[]>([]);

  const getCart = () => {
    api
      .get(`cart?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMyProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (item: ProductData) => {
    api
      .post(
        `cart/`,
        { ...item, userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getCart();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCart = (id: number) => {
    api
      .delete(`cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CartContext.Provider
      value={{ getCart, myProducts, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
