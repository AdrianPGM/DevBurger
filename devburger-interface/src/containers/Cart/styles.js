import styled from "styled-components";
import texture from '../../assets/texture.svg'
import Background from '../../assets/background.svg'

export const Container = styled.div`
    width: 100%;
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.6)
    ),
     url('${Background}');
    min-height: 100vh;
    position: relative;
`

export const Banner = styled.div`
    background: url('${texture}');
    background-color: ${props => props.theme.mainBlack};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 180px;

    img { 
        height: 150px;
    }
`

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 800;
    padding-bottom: 12px;
    color: ${props => props.theme.gren};
    text-align: center;
    position: relative;

    &::after {
        position: absolute;
        content: '';
        width: 56px;
        height: 4px;
        background-color: ${props => props.theme.purple};
        bottom: 0;
        left: calc(50% - 28px);
    }
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 30%;
    width: 100%;
    max-width: 1280px;
    padding: 40px;
    margin: 0 auto;
    gap: 40px;
`

export const ReturnHome = styled.button`
    background-color: transparent;
    border: none;
`