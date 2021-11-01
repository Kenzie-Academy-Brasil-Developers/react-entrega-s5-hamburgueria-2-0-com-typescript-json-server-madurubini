import { Button } from "@chakra-ui/button";
import { useCart } from "../../providers/Cart";

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

  return (
    <div>
      <Button
        onClick={() => {
          setShowCart(false);
          getCart();
        }}
      >
        Fechar Carrinho
      </Button>
      {myProducts.length >= 0 ? (
        myProducts.map((item: ProductData, index: number) => {
          return (
            <li key={item.id}>
              <p>{item.title}</p>
              <p>R$: {item.price}</p>
              <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
            </li>
          );
        })
      ) : (
        <p>Carrinho Vazio</p>
      )}
    </div>
  );
};

export default Cart;
