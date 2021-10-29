import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { useUsers } from "../../providers/User";
import { useCart } from "../../providers/Cart";
import Cart from "../../components/Cart";

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
  const { getCart, myProducts } = useCart();
  const [showCart, setShowCart] = useState(false);

  const openCart = () => {
    if (authToken) {
      alert("ok");
      getCart();
      setShowCart(true);
      console.log(myProducts);
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
    <>
      <button onClick={Logout}>Logout</button>
      <button onClick={openCart}>Cart</button>
      {showCart && <Cart setShowCart={setShowCart} />}
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.code}>
              <h3>{item.title}</h3>
              <img src={item.img} alt={item.title} />
              <p>{item.description}</p>
              <span>{item.price}</span>
              <button onClick={() => history.push("/login")}>Add</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
