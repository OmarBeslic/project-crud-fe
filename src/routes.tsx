import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import AllProjects from './AllProjects/Table';

const ProjectRoutes: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ProjectRoutes;
