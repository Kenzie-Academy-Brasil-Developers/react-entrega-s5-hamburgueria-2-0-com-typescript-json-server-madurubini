import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { useUsers } from "../../providers/User";
import { useCart } from "../../providers/Cart";
import Cart from "../../components/Cart";
import { Button } from "@chakra-ui/button";
import { Container } from "../Login/styles";
import { List, MenuContainer, ProductCard } from "./styles";

interface MenuData {
  code: number;
  title: string;
  price: number;
  img: string;
  description: string;
}

const Home = () => {
  const [menu, setMenu] = useState<MenuData[]>([]);
  const history = useHistory();
  const { Logout, authToken } = useUsers();
  const { getCart, addToCart, myProducts } = useCart();
  const [showCart, setShowCart] = useState(false);
  const userId = localStorage.getItem("user");

  const openCart = () => {
    if (authToken) {
      getCart(userId);
      setShowCart(true);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    api
      .get(`products/`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MenuContainer>
      <Button onClick={Logout}>Logout</Button>
      <Button onClick={openCart}>Cart</Button>
      {showCart && <Cart setShowCart={setShowCart} />}
      <h2>Qual será a sua escolha de hoje?</h2>

      <List>
        {menu.map((item) => {
          return (
            <ProductCard key={item.code}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>

              {/* <p>{item.description}</p> */}
              <p>R$ {item.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(item, userId)}>Add</Button>
            </ProductCard>
          );
        })}
      </List>
    </MenuContainer>
  );
};

export default Home;
