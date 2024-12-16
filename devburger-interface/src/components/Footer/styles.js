import styled from "styled-components";

export const Container = styled.footer`
    height: 50px;
    background-color: ${props => props.theme.darkPurple};
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color: ${props => props.theme.white};
        font-size: 14px;
        font-weight: lighter;
    }
`