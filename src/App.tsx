import React from 'react';
import styled from 'styled-components';
import { useGetProjectsQuery } from './features/api/projectApi';
import Sidebar from './components/Sidebar/Sidebar';
import { StyledPage } from './StyledPage';
import ProjectRoutes from './routes';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
`;

const App: React.FC = () => {
  const { data: projects } = useGetProjectsQuery();
  const favoriteProjects =
    projects?.filter((project) => project.isFavorite) ?? [];

  return (
    <Container>
      <Sidebar favoriteProjects={favoriteProjects} />
      <StyledPage>
        <ProjectRoutes />
      </StyledPage>
    </Container>
  );
};

export default App;
