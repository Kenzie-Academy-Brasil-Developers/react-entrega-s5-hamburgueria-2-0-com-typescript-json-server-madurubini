import styled from "styled-components";

export const Container = styled.div`
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1%;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 15px 0;
  width: 100%;
  padding: 5% 0;
`;

export const Form = styled.form`
  padding: 5px;
`;

export const SideBorder = styled.div`
  width: 40%;
  height: 1px;
  background-color: black;
`;

export const OrComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Headers = styled.h1`
  font-weight: bold;
  font-size: 2em;
`;
