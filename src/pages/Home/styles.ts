import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  overflow-x: auto;
  /* 
  @media (min-width: 1024px) {
    justify-content: center;
    overflow-x: none;
    flex-wrap: wrap;
    width: 90%;
  } */
`;

export const ProductCard = styled.li`
  list-style: none;
  margin: 1%;
  padding: 1%;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  box-shadow: 0px 4px 40px -20px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  max-width: 300px;

  img {
    width: 80%;
    border-radius: 100%;
  }
`;

export const Buttons = styled(List)`
  display: flex;
  justify-content: space-between;
  margin: 1%;
`;
