import React from 'react';
import styled from 'styled-components';
import { useGetProjectsQuery } from './features/api/projectApi';
import Sidebar from './components/Sidebar/Sidebar';
import { StyledPage } from './StyledPage';
import ProjectRoutes from './routes';
import Header from './components/HeaderComponent';
import { LayoutProvider } from './context/LayoutContext';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100vh;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const App: React.FC = () => {
  const { data: projects } = useGetProjectsQuery();
  const favoriteProjects =
    projects?.filter((project) => project.isFavorite) ?? [];

  return (
    <Container>
      <LayoutProvider>
        <Header />
        <Sidebar favoriteProjects={favoriteProjects} />
      </LayoutProvider>

      <StyledPage>
        <ProjectRoutes />
      </StyledPage>
    </Container>
  );
};

export default App;
