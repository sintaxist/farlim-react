import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {Content} from './utils/UseElements';

import { Logo, LogoMobile } from './Navbar/NavbarElements';

import { getContent, urlAdmin } from './utils/httpClient';

export const Footer = () => {

    const [content, setContent] = useState([]);

    useEffect(() =>{
        getContent('footer?populate=*').then((data) => {
            setContent(data)
        });
    }, [])

    return(
        <FooterFlex>
            <Content>
                <Link to='/' className='logo-footer'>
                    <Logo src={urlAdmin + content?.data?.attributes.image.data.attributes.url} alt='logo'/>
                    <LogoMobile className='logo-mobile' src={urlAdmin + content?.data?.attributes.imgMobile.data.attributes.url} alt='logo-mobile'/>
                </Link>
                <MenuFooter>
                    {content?.data?.attributes.links.data.map(link =>(
                        <FooterLink key={link.id} to={link.attributes.link}>
                        {link.attributes.linkName}
                        </FooterLink>
                    ))}
                </MenuFooter>
            </Content>
            <Address>Derechos Reservados 2022©</Address>
        </FooterFlex>
    )
}

const FooterFlex = styled.footer`
    height: 24rem;
    display: flex;
    flex-direction: column;
    background: linear-gradient(75deg, #474DEF, #263575);
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 3;
    >div{
        padding-bottom: 30px;
        width: 88%;
        @media(max-width:960px){
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 30px;
        }
    }
    @media(max-width:960px){
        .logo-footer{
            width: 40%;
            max-width: 100px;
            margin: auto 0;
        }
    }
    .logo-mobile{
        width: 100%;
        margin: auto;
    }
`

const MenuFooter = styled.div`
    width: 100%;
    display: flex;
    padding: 30px 0;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    @media(max-width:960px){
        width: auto;
        flex-direction: column;
        align-items: start;
    }
`

const Address = styled.address`
    font-style: normal;
    font-size: 13px;
    color: #fff;
    display: block;
    width: 100%;
    text-align: center;
    padding: 20px 0px;
    border-top: 2px #fff solid;
`

export const FooterLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  transition: all .3s;
  font-size: .8rem;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 2px;
    background: #fff;
    width: 100%;
    transform-origin: left;
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
    margin: 0;
    margin-bottom: 15px;
    text-align: start;
    &:before{
      height: 3px;
    }
  }
  @media(max-width: 550px){
    font-size: .7rem;
    margin-bottom: 0px;
  }
`;