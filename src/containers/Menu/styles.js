import styled from "styled-components"
import BannerHamburguer from "../../assets/banner-hamburguer.svg"
import Background from "../../assets/background.png"
import { Link } from "react-router-dom";

export const Container = styled.div `
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.secondWhite};

    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ),
    url("${Background}");

    .back-button {
        width: 10%;
        margin-left: calc(50% - 137px);
        margin-top: 20px;
        font-size: 25px;
        margin-bottom: 15px; 
    }
`;

export const Banner = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;

    background: url("${BannerHamburguer}");
    background-color: ${(props) => props.theme.mainBlack};
    background-position: center;
    background-size: cover;
    position: relative;

    h1 {
        font-family: "Road Rage", sans-serif;
        font-size: 80px;
        line-height: 65px;
        color: ${(props) => props.theme.white};
        position: absolute;

        right: 20%;
        top: 30%;
    }

    span {
        display: block;
        color: ${(props) => props.theme.white};
        font-size: 20px;
    }
`;

export const CategoryMenu = styled.div `
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 40px;
`;

export const CategoryButton = styled(Link) `
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${(props) => (props.$isActiveCategory ? props.theme.purple : props.theme.gray)};
    font-weight: 700;
    font-size: 24px;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && `3px solid ${props.theme.purple}`};

`;


export const ProductsContainer = styled.div `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto 0;
`;
