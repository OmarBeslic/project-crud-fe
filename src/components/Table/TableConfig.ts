export const columns = [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
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
    title: "Favorite",
    dataIndex: "isFavorite",
    key: "isFavorite",
    render: (isFavorite: boolean) => (isFavorite ? "⭐ Yes" : "❌ No"),
  },
];