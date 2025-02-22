import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

import { useGetProjectsQuery } from './features/api/projectApi';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ProjectTable from './Pages/AllProjects/Table/Table';
import AllProjects from './Pages/AllProjects/Table';
import ProjectForm from './components/ProjectForm';
import { StyledPage } from './StyledPage';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
`;

const App = () => {
  const navigate = useNavigate();
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  const favouriteProjects = projects?.filter((el) => el.isFavorite);

  return (
    <Container>
      <Sidebar favoriteProjects={favouriteProjects ?? []} />

      <StyledPage>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route
            path="/projects/new"
            element={
              <ProjectForm
                mode="new"
                onSubmitSuccess={() => navigate('/projects')}
              />
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProjectForm
                mode="read"
                onSubmitSuccess={() => navigate('/projects')}
              />
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <ProjectForm
                mode="edit"
                onSubmitSuccess={() => navigate('/projects')}
              />
            }
          />

          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </StyledPage>
    </Container>
  );
};

export default App;
