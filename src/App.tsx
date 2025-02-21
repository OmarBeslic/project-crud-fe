import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import ProjectTable from "./components/Table/Table";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const App = () => {

  return (
    <Container>
      <Sidebar favoriteProjects={[]} />
      <ProjectTable />
    </Container>
  );
};

export default App;
