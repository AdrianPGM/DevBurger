import styled from "styled-components";
import BannerHamburguer from '../../assets/banner-hamburguer.svg'
import Background from '../../assets/background.svg'
import { Link } from "react-router-dom";


export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto;
`

export const Banner = styled.div`
    background: url('${BannerHamburguer}') no-repeat;
    background-position: center;
    background-color: ${props => props.theme.mainBlack};
    background-size: cover;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    position: relative;

    h1 {
        font-family: ${props => props.theme.roadRageFont};
        font-size: 80px;
        line-height: 65px;
        color: ${props => props.theme.white};
        position: absolute;

        right: 20%;
        top: 30%;

        span {
        display: block;
        color: ${props => props.theme.white};
        font-size: 20px;
    }
    }

    
`

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme.secondWhite};
    position: relative;

  
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ),
     url('${Background}');

`

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`

export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${props => props.$isActiveCategory ? props => props.theme.purple : '#696969'};
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${props => props.$isActiveCategory && `3px solid ${props.theme.purple}` } ;

`

