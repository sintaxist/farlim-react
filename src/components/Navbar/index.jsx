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

function Navbar() {

  const [content, setContent] = useState([]);

  useEffect(() =>{
    getContent('header?populate=*').then((data) => {
        setContent(data)
    });
  }, [])

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
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
          <Logo src={urlAdmin + content?.data?.attributes.image.data.attributes.url} alt="logo" />
          <LogoMobile src={urlAdmin + content?.data?.attributes.imgMobile.data.attributes.url} alt="logo-mobile" />
        </LogoLink>

        <LinkContainer>
          {content?.data?.attributes.links.data.map(link =>(
            <NavLink key={link.id} to={link.attributes.link}>
              {link.attributes.linkName}
            </NavLink>
          ))}
        </LinkContainer>

        <LinksMobile className={`${clicked ? 'active' : ''}`}>
          <NavLink to='/' onClick={handleClick}>inicio</NavLink>
          {content?.data?.attributes.links.data.map(link =>(
            <NavLink key={link.id} to={link.attributes.link} onClick={handleClick}>
              {link.attributes.linkName}
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
