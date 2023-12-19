import { useState, useEffect } from 'react';
import BurguerButton from './BurgerButton';
import {
  NavLink,
  NavContainer,
  Logo,
  LogoMobile,
  Header,
  LogoLink,
  BgDiv,
  LinkContainer,
  LinksMobile,
  Menu,
  Overlay
} from './NavbarElements';

import {getContent, urlAdmin} from '../utils/httpClient';

const getDefaultUrl = (data) => (data && data.attributes && data.attributes.url) || '';

const getDefaultMobile = (logo) => (logo && logo.Mobile) || { data: { attributes: { url: '' } } };
const getDefaultDesktop = (logo) => (logo && logo.Desktop) || { data: { attributes: { url: '' } } };

const getDefaultLinks = (menu) => (menu && menu.Links) || [];

const getLogoUrls = (logo) => {
  const mobile = getDefaultMobile(logo);
  const desktop = getDefaultDesktop(logo);

  return {
    mobileUrl: getDefaultUrl(mobile.data),
    desktopUrl: getDefaultUrl(desktop.data),
  };
};

const getNavbarContent = (content) => {
  const {
    data: {
      id,
      attributes: {
        Whatsapp,
        Logo,
        Menu,
      } = {},
    } = {},
  } = content || {};

  const { mobileUrl, desktopUrl } = getLogoUrls(Logo);

  const links = getDefaultLinks(Menu);

  return {
    id,
    Whatsapp,
    mobileUrl,
    desktopUrl,
    links,
  };
};

function Navbar() {

  const [content, setContent] = useState({});
  const [clicked, setClicked] = useState(false);

  useEffect(() =>{
    getContent('menu-header?populate=Logo.Mobile,Logo.Desktop,Menu.Links')
      .then((data) => {
        setContent(data);
      });
  }, [])

  const {
    id,
    Whatsapp,
    mobileUrl,
    desktopUrl,
    links,
  } = getNavbarContent(content);

  const handleClick = () => {
    setClicked(!clicked)
  }

  let lastScrollTop = 0;
  
  const chageHeader = () => {

    let header = document.getElementById('header');

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollTop > lastScrollTop){
      header.style.top='-100px'
    }else{
      header.style.top='0px'
    }

    lastScrollTop = scrollTop;

    if(window.scrollY >= 80){
      header.classList.add('active')
    }else{
      header.classList.remove('active')
    }
  }

  window.addEventListener('scroll', chageHeader);

  return (
    <Header id='header' className='header'> 
      <NavContainer className='widthBreak'>

        <LogoLink to='/'>
          <Logo src={desktopUrl} alt="logo" />
          <LogoMobile src={mobileUrl} alt="logo-mobile" />
        </LogoLink>

        <LinkContainer>
          {links.filter(link => link.Show).map(link =>(
            <NavLink key={link.id} to={link.Path}>
              {link.Name}
            </NavLink>
          ))}
        </LinkContainer>

        <LinksMobile className={`${clicked ? 'active' : ''}`}>
          <NavLink to='/' onClick={handleClick}>inicio</NavLink>
          {links.filter(link => link.Show).map(link =>(
            <NavLink key={link.id} to={link.Path}>
              {link.Name}
            </NavLink>
          ))}
        </LinksMobile>

        <Menu className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </Menu>

        <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>


        <Overlay className={`initial ${clicked ? ' active' : ''}`} onClick={handleClick}></Overlay>

      </NavContainer>
    </Header>
  );
}

export default Navbar;
