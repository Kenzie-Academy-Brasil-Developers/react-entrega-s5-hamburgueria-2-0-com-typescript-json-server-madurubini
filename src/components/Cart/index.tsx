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
  const { myProducts, removeFromCart } = useCart();

  return (
    <div>
      <button onClick={() => setShowCart(false)}>Fechar Carrinho</button>
      {myProducts.map((item: ProductData, index: number) => {
        return (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>R$: {item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        );
      })}
    </div>
  );
};

export default Cart;
