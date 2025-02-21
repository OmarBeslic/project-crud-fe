import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <h1>Welcome to My React App</h1>
      <Button type="primary">Click Me</Button>
    </Container>
  );
};

export default App;
