import React from "react";
import { Table } from "antd";
import { useGetProjectsQuery, useToggleFavoriteMutation } from "../../../features/api/projectApi";
import FavIcon from "../../../components/FavIcon";
import { Link } from "react-router-dom";

interface ProjectTableProps {
  projects: Project[],
  isLoading: boolean

}
const ProjectTable: React.FC<ProjectTableProps> = ({ projects, isLoading }) => {
  const [toggleFavorite, { isLoading: isToggling }] = useToggleFavoriteMutation();
  const columns = [
    {
      title: "Project ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <Link to={`/projects/${id}`}>{id}</Link>
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toISOString().split("T")[0], // Format date
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toISOString().split("T")[0],
    },
    {
      title: "",
      dataIndex: "isFavorite",
      key: "isFavorite",
      render: (isFavorite: boolean, record: { id: string }) => <FavIcon width={20} height={20} fillColor={isFavorite ? "red" : "black"} handleFav={() => toggleFavorite(record.id)} />

    },
  ];

  return <Table dataSource={projects} columns={columns} rowKey="id" loading={isLoading || isToggling} scroll={{ x: "max-content" }} style={{ width: "100%" }} />;
};

export default ProjectTable;
