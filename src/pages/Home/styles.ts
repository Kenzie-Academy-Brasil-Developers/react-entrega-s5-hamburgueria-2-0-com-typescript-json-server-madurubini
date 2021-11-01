import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const List = styled.ul`
  width: 100%;
  display: flex;

  overflow-x: auto;
`;

export const ProductCard = styled.li`
  list-style: none;
  border: 1px solid red;
  margin: 1%;
  padding: 1%;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  img {
    width: 80%;
    border-radius: 100%;
  }
`;
