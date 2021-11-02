import styled from "styled-components";

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
  min-height: 80px;
  display: flex;
  align-items: center;
  margin: 80px;
  text-align: center;
`;
