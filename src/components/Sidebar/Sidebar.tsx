import React from "react"
import { StyledSidebar } from "./StyledSidebar"

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  manager: string;
  isFavorite: boolean
}
const Sidebar: React.FC<{ favoriteProjects: Project[] }> = ({ favoriteProjects }) => {
  return (
    <StyledSidebar>
      <h1 className="sidebar-title">Favorite projects</h1>
      {
        !favoriteProjects?.length ? <h6 className="no-data">No favorite projects.</h6> : <div>Have</div>
      }
    </StyledSidebar>
  )
}

export default Sidebar