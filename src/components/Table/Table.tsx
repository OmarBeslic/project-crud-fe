import React from "react";
import { Table } from "antd";
import { columns } from "./TableConfig";
import { useGetProjectsQuery } from "../../features/api/projectApi";

const ProjectTable = () => {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  return <Table dataSource={projects} columns={columns} rowKey="id" loading={isLoading} />;
};

export default ProjectTable;
