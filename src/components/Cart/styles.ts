import styled from "styled-components";
import { List } from "../../pages/Home/styles";

export const CartContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  overflow: auto;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
`;

export const CartContent = styled.div`
  background-color: white;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 95%;
  min-height: 50vh;
`;

export const CartList = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  margin: 1%;
  padding: 1%;
`;

export const HeaderCart = styled(CartList)`
  justify-content: space-between;
  align-items: center;
`;

export const FilterComponent = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5%;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  box-shadow: 0px 4px 40px -20px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 2% 0;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

export const FilterList = styled(List)`
  justify-content: flex-start;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`;
