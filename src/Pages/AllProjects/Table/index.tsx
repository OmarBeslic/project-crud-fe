import React from 'react';
import { Button } from 'antd';
import { useGetProjectsQuery } from '../../../features/api/projectApi';
import ProjectTable from './Table';
import { StyledAll } from '../StyledAll';
import { useNavigate } from 'react-router-dom';

const AllProjects = () => {
  const navigate = useNavigate();
  const { data: projects, error, isLoading } = useGetProjectsQuery();

  return (
    <StyledAll>
      <Button type="primary" onClick={() => navigate('/projects/new')}>
        Create Project
      </Button>
      <ProjectTable projects={projects ?? []} isLoading={isLoading} />
    </StyledAll>
  );
};

export default AllProjects;
