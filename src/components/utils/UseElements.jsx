import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Content = styled.div`
    position: relative;
    display: block;
    padding: 60px 3%;
    max-width: 1300px;
    margin: auto;
    z-index: 1;
`;

export const FlexRow = styled.ul`
    display: flex;
    justify-content: space-between;
`;

export const Grid2Items = styled.ul`
    display: grid;
    height: 100%;
    justify-content: center;
    grid-template-columns: repeat(2, minmax(100px, 700px));
    grid-auto-rows: 200px;
    grid-gap: 30px;

    @media screen and (max-width: 960px){
        justify-content: space-between;
        grid-template-columns: auto;
    }

    @media screen and (max-width: 550px){
       grid-auto-rows: 250px;
    }
`;

export const Button = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 3px 20px 3px 30px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s;
    text-transform: uppercase;
    font-size: 1rem;
    border: 3px solid;
    svg{
        width: 45px;
    }
    .line{
        display: none;
    }
    &:hover{
        letter-spacing: 4px;
        svg{
            margin-left: 15px;
        }
        .line{
            display: block;
        }
    }
    @media (max-width:960px){
        padding: 2px 10px 1px 15px;
        font-size: .8rem;
        &:hover{
            letter-spacing: 2px;
        }
    }
    @media (max-width:550px){
        justify-content: center;
        width: 94%;
        font-size: 12px;
        margin: auto;
    }
`;

export const ButtonForm = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 3px 20px 3px 30px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s;
    text-transform: uppercase;
    font-size: 1rem;
    border: 3px solid;
    svg{
        width: 45px;
    }
    .line{
        display: none;
    }
    &:hover{
        letter-spacing: 4px;
        svg{
            margin-left: 15px;
        }
        .line{
            display: block;
        }
    }
    @media (max-width:960px){
        padding: 2px 10px 1px 15px;
        font-size: .8rem;
        &:hover{
            letter-spacing: 2px;
        }
    }
    @media (max-width:550px){
        justify-content: center;
        width: 94%;
        font-size: 12px;
        margin: auto;
    }
`;

export const Download = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 3px 20px 3px 30px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s;
    text-transform: uppercase;
    font-size: 1rem;
    border: 3px solid;
    svg{
        width: 45px;
    }
    .line{
        display: none;
    }
    &:hover{
        letter-spacing: 4px;
        svg{
            margin-left: 15px;
        }
        .line{
            display: block;
        }
    }
    @media (max-width:960px){
        padding: 2px 10px 1px 15px;
        font-size: .8rem;
        &:hover{
            letter-spacing: 2px;
        }
    }
    @media (max-width:550px){
        justify-content: center;
        width: 94%;
        font-size: 12px;
        margin: auto;
    }
`

export const FlechaButton = () => {
    return(
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='line' d="M7 12H17" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 8L17 12L13 16" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const PContainer = styled.div`
    display: block;
    p, strong{
        display: block;
        margin-bottom: 30px;
    }

    @media screen and (max-width: 960px){
        p,strong{
            margin-bottom: 15px;
        }
    }
`

export const LogoCopy = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 250px;
    position: relative;
    img{
        width: 100px;
        margin-right: 30px
    }
    p{
        margin-left: 15px;
    }
    h3{
        text-align: left;
        font-weight: bold;
    }
    div{
        margin-left: 0px;
        position: relative;
        p{
            margin-left: 0px;
            margin-top: 15px;
        }
    }
    > span{
        position: absolute;
        font-weight: bold;
        font-size: 1.5rem;
        color: #F9FDFC;
        background: #51dcaa;
        padding: 15px 20px;
        border-radius: 50px;
        top: -20px;
        left: -100px;
    }

    @media screen and (max-width: 960px){
        height: 400px;
        p,strong{
            margin-bottom: 15px;
        }
        > span{
            padding: 10px 15px;
            left: -51px;
        }
    }

    @media screen and (max-width: 550px){
        flex-direction: column;
        img{
            margin-bottom: 30px;
            margin-right: 0px;
        }
        p, span{
            margin-left: 0px;
            text-align: center;
        }
        h3{
            text-align: center;
        }
    }
`

export const ProductContain = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin: 60px 0;
    @media (max-width:960px) {
        margin: 30px 0;
        gap: 15px;
    }
`

export const CategoryContain = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 60px 0;
    gap: 30px;
    justify-content: center;
    @media (max-width:960px) {
        margin: 30px 0;
        gap: 15px;
    }
`

const pulse = keyframes` 
    0% {
        transform: scale(0.95);
    }

    70% {
        transform: scale(1.3);
    }

    100% {
        transform: scale(0.95);
    }
`

export const OverlayLoading = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F9FDFC;
    position: fixed;
    top: 0;
    left: 0%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${({ loading }) => (loading === "true"? '1' : '0')};
    transition: opacity 0.2s ease-out; 

    img {
        width: 90%;
        max-width: 200px;
        min-width: 220px;
        transform: scale(1);
        animation: ${pulse} 2s infinite;
    }
`;
