import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: none;
  h1 {
    margin: 0;
    font-size: 20px;
  }
  .hb {
    display: inline-block;
    cursor: pointer;
    .bar {
      margin: 3px;
      width: 25px;
      height: 3px;
      background: #000;
      border-radius: 0;
      transition: margin 0.2s, transform 0.2s;
      -webkit-transition: margin 0.2s, -webkit-transform 0.2s;
      transition: margin 0.2s, -webkit-transform 0.2s;
      -o-transition: margin 0.2s, transform 0.2s;
      transition: margin 0.2s, transform 0.2s;
      transition: margin 0.2s, transform 0.2s, -webkit-transform 0.2s;
    }

    &:not(.open):hover .bar {
      margin: 5px 3px;
    }
    &.open .bar:first-child {
      -webkit-transform: translateY(6px) rotate(45deg);
      -ms-transform: translateY(6px) rotate(45deg);
      transform: translateY(6px) rotate(45deg);
    }
    &.open .bar:nth-child(2) {
      opacity: 0;
    }
    &.open .bar:last-child {
      -webkit-transform: translateY(-6px) rotate(-45deg);
      -ms-transform: translateY(-6px) rotate(-45deg);
      transform: translateY(-6px) rotate(-45deg);
    }
  }
  @media (max-width: 1024px) {
    padding: 10px;
    height: 72px;
    width: 100%;
    background: #fff;
    border-bottom: 2px solid #ccc;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    background: #f5f5f5;
  }
`;
