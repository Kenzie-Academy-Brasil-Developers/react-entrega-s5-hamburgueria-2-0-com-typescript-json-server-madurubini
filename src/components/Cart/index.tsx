import { Button } from "@chakra-ui/button";
import { Modal } from "@chakra-ui/modal";
import { List, ProductCard } from "../../pages/Home/styles";
import { useCart } from "../../providers/Cart";
import { CartContainer, CartContent, CartList, HeaderCart } from "./styles";

interface CartProps {
  setShowCart: any;
}

interface ProductData {
  title: string;
  price: number;
  description: string;
  img: string;
  code: number;
  id?: any;
}

const Cart = ({ setShowCart }: CartProps) => {
  const { myProducts, removeFromCart, getCart } = useCart();
  const userId = localStorage.getItem("user");

  return (
    <CartContainer>
      <CartContent>
        <HeaderCart>
          <h3>Cart</h3>
          <Button
            onClick={() => {
              setShowCart(false);
              getCart(userId);
            }}
          >
            X
          </Button>
        </HeaderCart>

        <CartList>
          {myProducts.length > 0 ? (
            myProducts.map((item: ProductData, index: number) => {
              return (
                <ProductCard key={item.id}>
                  <img src={item.img} alt={item.title} />
                  <p>{item.title}</p>
                  <p>R$ {item.price.toFixed(2)}</p>
                  <Button onClick={() => removeFromCart(item.id, userId)}>
                    Remove
                  </Button>
                </ProductCard>
              );
            })
          ) : (
            <p>Carrinho Vazio</p>
          )}
        </CartList>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
