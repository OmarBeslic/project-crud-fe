import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import ProjectTable from "./Table/Table";
import { useGetProjectsQuery } from "./features/api/projectApi";
import { Navigate, Route, Routes } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
`;

const App = () => {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  const favouriteProjects = projects?.filter(el => el.isFavorite)
  return (
    <Container>
      <Sidebar favoriteProjects={favouriteProjects ?? []} />

      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectTable projects={projects ?? []} isLoading={isLoading} />} />
        <Route path="/projects/new" element={<div />} />
        <Route path="/projects/:id" element={<div />} />
        <Route path="/projects/:id/edit" element={<div />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Container>
  );
};

export default App;
