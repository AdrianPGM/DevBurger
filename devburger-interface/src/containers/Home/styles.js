import styled from "styled-components";
import BannerHome from '../../assets/banner-home.svg'
import Background from '../../assets/background.svg'

export const Main = styled.main`
    
`



export const Banner = styled.div`
    background: url('${BannerHome}');
    background-size: cover;
    background-position: center;
    height: 480px;

    h1{
        font-family: ${props => props.theme.roadRageFont};
        font-size: 80px;
        color: ${props => props.theme.darkWhite};
        position: absolute;
        right: 20%;
        top: 10%;
    }
`


export const Container = styled.section`
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ),
     url('${Background}');
`