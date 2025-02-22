import styled from 'styled-components';

interface SidebarProps {
  collapsed: boolean;
}

export const StyledSidebar = styled.aside<SidebarProps>`
  width: 280px;
  height: 100%;
  border-right: 2px solid #ccc;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;

  .sidebar-title {
    margin: 0 0 20px;
    font-size: 20px;
  }

  .no-data {
    font-size: 12px;
    margin: 0;
  }

  .fav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 0;

    li {
      list-style-type: none;

      a {
        text-decoration: none;
        color: blue;
      }
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.collapsed ? '-100%' : '0')};
    margin-top: 72px;
    height: calc(100% - 72px);
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    z-index: 100;
  }
  @media (max-width: 576px) {
    border: none;
    width: 100%;
  }
`;
