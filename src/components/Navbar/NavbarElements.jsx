import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  z-index: 99;
  top: 0;
  padding: 20px 3%;
  width: 94%;
`

export const NavContainer = styled.nav`
  width: 100%;
  max-width: 1300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LinksMobile = styled.div`
  position: absolute;
  top: -700px;
  right: -2000px;
  right: 0;
  margin: auto;
  text-align: center;
  transition: all .5s ease;
  display: block;
  z-index: 3;
 
  @media(min-width: 960px){
    position: initial;
    margin: 0;
    display: none;
  }
  &.active{
    display: block;
    position: absolute;
    top: 100px;
    right: 60px;
    text-align: center;
  }
`

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  width: fit-content;
  text-align: center;
  padding: 10px 15px;
  transition: all .3s;
  font-size: .8rem;
  position: relative;
  margin: auto;
  &:before{
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 2px;
    background: #fff;
    width: 100%;
    transform-origin: center;
    transform: scaleX(0);
    transition: all .3s;
    border-radius: 50px;
  }
  &:hover{
      &:before{
          transform: scaleX(1);
      }
  }
  @media(max-width: 960px){
    font-size: 1rem;
    margin: auto;
    margin-bottom: 15px;
    color: #474DEF;
    &:before{
      height: 3px;
      background: linear-gradient(45deg, #474DEF, #01d8fb);
    }
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  @media(max-width: 960px){
    display: none;
  }
`

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  z-index: 3;
`;

export const Logo = styled.img`
  display: block;
  margin: auto;
  padding: 0rem 6%;
  height: auto;
  width: 80%;
  max-width: 250px;
  @media(max-width:960px){
    display: none;
  }
`;

export const LogoMobile = styled.img`
  display: none;
  @media(max-width:960px){
    display: block;
  }
`

export const BgDiv = styled.div`
  background-color: #fff;
  position: absolute;
  top: -1200px;
  right: -1000px;
  width: 1200px;
  height: 1200px;
  z-index: 1;
  border-radius: 50%;
  transition: all .6s ease;
  box-shadow: 0 0 20px rgb(0, 0, 0, 25%);
  display: none;
  
  &.active{
    top: -500px;
    right: -700px;
  }

  @media (max-width:960px) {
    display: block;
  }
`

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: #263575;
  position: fixed;
  top: 0;
  right: -100vw;
  opacity: 0;
  z-index: 0;
  transition: right .6s, opacity 1s;

  &.active{
    right: 0;
    opacity: .7;
  }

  @media (max-width:960px) {
    display: block;
  }
`

export const Menu = styled.div`
  display: none;
  position: relative;
  z-index: 2;
  @media(max-width:960px){
    display: block;
    top: 5px;
  }
  @media(max-width:550px){
    top: 7px;
  }
`