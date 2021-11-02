import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { useUsers } from "../../providers/User";
import { useCart } from "../../providers/Cart";
import Cart from "../../components/Cart";
import { Button } from "@chakra-ui/button";
import { Buttons, List, MenuContainer, ProductCard } from "./styles";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { MdSearch } from "react-icons/md";
import { FilterComponent, FilterList } from "../../components/Cart/styles";
import { Text } from "@chakra-ui/layout";

interface MenuData {
  code: number;
  title: string;
  price: number;
  img: string;
  description: string;
}

const Home = () => {
  const [menu, setMenu] = useState<MenuData[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<MenuData[]>([]);

  const history = useHistory();
  const { Logout, authToken } = useUsers();
  const { getCart, addToCart } = useCart();
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
        <Text fontSize="3xl" fontFamily="monospace">
          H<span>&#127833;</span>T
        </Text>
        <Button onClick={Logout}>Logout</Button>
      </Buttons>

      {showCart && <Cart setShowCart={setShowCart} />}
      <Text fontSize="xl" m={2}>
        Qual será a escolha de hoje? <span>&#129378;</span>
      </Text>
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
      <FilterList>
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
            <Text fontSize="4xl">&#127836;</Text>

            <Text fontSize="xl">Encontre o seu favorito</Text>
            <Text fontSize="4xl">&#127835;</Text>
          </FilterComponent>
        )}
      </FilterList>

      <Text fontSize="xl" m={3}>
        All Specialities
      </Text>
      <List>
        {menu.map((item) => {
          return (
            <ProductCard key={item.code}>
              <img src={item.img} alt={item.title} />
              <Text fontSize="lg">{item.title}</Text>
              <Text fontSize="lg">R$ {item.price.toFixed(2)}</Text>
              <Button onClick={() => addToCart(item, userId)}>Add</Button>
            </ProductCard>
          );
        })}
      </List>
    </MenuContainer>
  );
};

export default Home;
