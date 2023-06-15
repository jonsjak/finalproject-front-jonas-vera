import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
`

export const DiagonalBox = styled.div`
  background: linear-gradient(to bottom, #57c1eb 0%,#008ca5 100%); 
  transform: skewY(-8deg);
  position: absolute;
  z-index: 997;
  top: -146px;
  width: 100%;
  height: 194px;
`

export const IconMenuBar = styled.menu`
  position: absolute;
  left: -19px;
  bottom: -8px;
  z-index: 997;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 15px;
  justify-content: flex-end;
  padding: 0px;
  height: 110vh;
`

export const MenuBackground = styled.div`
  position: absolute;
  left: -81px;
  bottom: -19px;
  z-index: 996;
  padding: 0px;
  width: 100px;
  background: linear-gradient(to right, #68a0d6 0%,#008ca5 100%); 
  height: 110vh;
  transform: rotate(-7deg);
`

export const LoaderBackground = styled.div`
  background: #2D3142; 
  margin-top: 0px;
  height: 100vh;
  position: relative;
`;

export const NavBarContainer = styled.aside`
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 999;
`

export const NotFoundBackground = styled.div`
  background: #2D3142; 
  margin-top: 0px;
  height: 100vh;
  width: 100%;
  top: 0px;
  left: 0px;
  position: absolute;
  z-index: 997;
`;

export const PersonalWrapper = styled.div`
  height: 460px; 
  overflow: scroll; 
  padding-top: 30px; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
`

export const SavedMoviesWrapper = styled.div`
  height: 500px;
  overflow: scroll;
`

export const SavedMoviesContainer = styled.div`
  display: flex; 
  height: 120px;
  overflow: scroll;
  justify-content: space-between;
  background: #e8e8e8; 
  margin-top: 15px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2);
  border-radius: 4px;
`

