import styled, { keyframes } from 'styled-components'

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 10vh;
  width: 100vw;
  /* background-color: rgba(40, 40, 40, 0.8); Grey-blackish translucent background */
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-bottom: 5px;
  background:  #A4B4B8;
;
  border-bottom: white;
`;

export const NavbarInnerContainer = styled.div`
  height:100%;
  width:100%;
  display: flex;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: #125; */
  height: 100%;
  width: 12%;

  img {
    max-width: 100%; /* Ensure the logo scales with the container width */
    max-height: 100%; /* Ensure the logo scales with the container height */
    height: auto; /* Maintain aspect ratio */
    width: auto; /* Maintain aspect ratio */
    object-fit: contain; /* Ensure logo fits within its container */
  }

  @media (max-width: 1050px){
    width: 15%;
  }

  @media (max-width: 600px){
    width: 18%;
  }

  @media (max-width: 490px){
    width: 19%;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: #105; */
  height: 100%;
  width: 78%;

  @media (max-width: 1050px){
    width: 75%;
  }
  @media (max-width: 600px){
    width: 70%;
  }

  @media (max-width: 490px){
    width: 67%;
  }
`;

export const MiddleInnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
  list-style-type: none;
  color: #121B3D;
  font-size: 1.5rem;

  li:hover{
    color: orange;
    font-weight: 450;
  }

  .selected{
    color: orange;
  }

  @media (max-width: 1050px){
    font-size: 1.4rem;
  }

  @media (max-width: 950px){
    display: none;
  }
`;

export const RightContainer = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  @media (max-width: 600px){
    width: 12%;
  }

  @media (max-width: 490px){
    width: 15%;
  }
`

const slideIn = keyframes`
  from {
    transform: translate(200px, -200px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const NavbarExtendedContainer = styled.div`
  position: fixed;
  top: -220px;
  right: -120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 5%;
  height: 600px;
  width: 600px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5); /* Translucent black background */
  border: 0px solid rgba(255, 255, 255, 0.3); /* Light grey border */
  border-radius: 50%;
  backdrop-filter: blur(5px);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.3); /* Darker shadow for better contrast */
  list-style-type: none;
  font-weight: 500;
  font-size: 19px;
  animation: ${slideIn} 0.5s ease-out forwards;
  clip-path: ellipse(0% 0%, 100% 0%, 100% 85%, 0% 100%);
  overflow: hidden;
  padding-bottom: 5%;

  &:before {
    content: "";
    position: absolute;
    top: -20%;
    right: -20%;
    width: 140%;
    height: 140%;
    background: #A4B4B8; /* Subtle cloudy element */
    filter: blur(40px);
    z-index: -1;
    animation: ${slideIn} 1s ease-out forwards;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #A4B4B8; /* Additional cloudy effect */
    clip-path: polygon(0% 10%, 100% 0%, 100% 85%, 0% 100%);
    z-index: -1;
  }

  @media (max-width: 1100px) {
    height: 600px;
    width: 600px;
    gap: 5%;
  }
  @media (max-width: 950px) {
    height: 750px;  
    width: 750px;
  padding-bottom: 5%;
  gap: 1%;

  }
  @media (max-width: 800px) {
    height: 700px;
    width: 700px;
    gap: 0;
  }

  li {
    color: #121B3D;
    text-shadow: 0px 0px 5px #2f3750;
    padding: 10px 0;
    transition: color 0.3s ease, text-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #040817; /* Light grey for hover effect */
      text-shadow: 0px 0px 10px #1c233e, 0px 0px 20px #161d35;
    }
  }
`;