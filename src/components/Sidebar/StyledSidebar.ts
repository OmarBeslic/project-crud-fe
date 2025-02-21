import styled from "styled-components";

export const StyledSidebar = styled.aside`
width: 280px;
height: 100%;
border-right: 2px solid gray;
padding: 16px 24px;
display: flex;
flex-direction: column;
align-items: center;
.sidebar-title{
  margin: 0 0 20px;
}
.no-data{
  font-size: 12px;
  margin: 0;
}
.fav-list{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0;
  li{
    list-style-type: none;
    a{
      text-decoration: none;
      color: blue;
    }
  }
}

`