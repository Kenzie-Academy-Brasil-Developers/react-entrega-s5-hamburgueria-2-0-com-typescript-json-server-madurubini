import { createContext, ReactNode, useContext, useState } from "react";
import api from "../../services/api";
import { useToast } from "@chakra-ui/react";

interface CartProps {
  children: ReactNode;
}

interface CartProviderData {
  getCart: (userId: any) => void;
  myProducts: any;
  addToCart: (item: ProductData, userId: any) => void;
  removeFromCart: (id: number, userId: any) => void;
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
  const toast = useToast();
  const token = localStorage.getItem("token");

  const [myProducts, setMyProducts] = useState<ProductData[]>([]);

  const getCart = (userId: any) => {
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

  const addToCart = (item: ProductData, userId: any) => {
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
        getCart(userId);
        console.log(res.data);
        toast({
          title: "Added to Cart",
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Try again, refresh the page",
          status: "error",
          isClosable: true,
        });
      });
  };

  const removeFromCart = (id: number, userId: number) => {
    api
      .delete(`cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (myProducts.length === 1) {
          setMyProducts([]);
        } else {
          getCart(userId);
          toast({
            title: "Removed",
            status: "warning",
            isClosable: true,
            position: "top",
          });
        }
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
