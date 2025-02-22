import React from 'react';
import { StyledSidebar } from './StyledSidebar';
import { Link } from 'react-router-dom';
import { useLayoutContext } from '../../context/LayoutContext';

interface SidebarProps {
  favoriteProjects: Project[];
}
const Sidebar: React.FC<SidebarProps> = ({ favoriteProjects }) => {
  const { collapsed, toggleSidebar } = useLayoutContext();
  return (
    <StyledSidebar collapsed={collapsed}>
      <h1 className="sidebar-title">Favorite projects</h1>
      {!favoriteProjects?.length ? (
        <h6 className="no-data">No favorite projects.</h6>
      ) : (
        <ul className="fav-list">
          {favoriteProjects?.map((el, idx) => (
            <li key={idx}>
              <Link to={`/projects/${el.id}`} onClick={toggleSidebar}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
