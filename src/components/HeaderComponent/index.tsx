import React from 'react';
import { StyledHeader } from './StyledHeader';
import { useLayoutContext } from '../../context/LayoutContext';

const Header = () => {
  const { toggleSidebar, collapsed } = useLayoutContext();
  return (
    <StyledHeader>
      <h1>Projects</h1>
      <div
        onClick={() => toggleSidebar()}
        id="menu-icon"
        className={`hb ${!collapsed ? 'open' : ''}`}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </StyledHeader>
  );
};

export default Header;
