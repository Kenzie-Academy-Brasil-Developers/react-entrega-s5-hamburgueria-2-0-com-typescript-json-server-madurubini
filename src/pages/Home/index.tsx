import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { useUsers } from "../../providers/User";
import { useCart } from "../../providers/Cart";
import Cart from "../../components/Cart";
import { Button } from "@chakra-ui/button";
import { Container } from "../Login/styles";
import { Buttons, List, MenuContainer, ProductCard } from "./styles";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { MdSearch } from "react-icons/md";
import { FilterComponent } from "../../components/Cart/styles";

interface MenuData {
  code: number;
  title: string;
  price: number;
  img: string;
  description: string;
  // item?: any;
  // text?: any;
}

const Home = () => {
  const [menu, setMenu] = useState<MenuData[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<MenuData[]>([]);

  const history = useHistory();
  const { Logout, authToken } = useUsers();
  const { getCart, addToCart, myProducts } = useCart();
  const [showCart, setShowCart] = useState(false);
  const userId = localStorage.getItem("user");
  const [filter, setFilter] = useState<string>("");

  const openCart = () => {
    if (authToken) {
      getCart(userId);
      setShowCart(true);
    } else {
      history.push("/login");
    }
  };

  const filterProduct = (text: any) => {
    const product = menu.filter((item) => item.title.includes(text));
    setFilteredProduct(product);
    setFilter("");
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
      <Buttons>
        <Button onClick={openCart}>Cart</Button>

        <Button onClick={Logout}>Logout</Button>
      </Buttons>

      {showCart && <Cart setShowCart={setShowCart} />}
      <h2>Qual será a escolha de hoje?</h2>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<MdSearch />} />
        <Input
          type="text"
          placeholder="Gyu-Don... Curry..."
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
        />
        <Button
          onClick={() => {
            if (filter !== "") {
              filterProduct(filter);
            }
          }}
        >
          Filtrar
        </Button>
      </InputGroup>
      <List>
        {filteredProduct.length > 0 ? (
          filteredProduct.map((item) => {
            return (
              <ProductCard key={item.code}>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>R$ {item.price.toFixed(2)}</p>
                <Button onClick={() => addToCart(item, userId)}>Add</Button>
              </ProductCard>
            );
          })
        ) : (
          <FilterComponent>
            <p>Encontre o seu favorito</p>
          </FilterComponent>
        )}
      </List>

      <h2>All Specialities</h2>
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
