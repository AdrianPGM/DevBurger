import styled from "styled-components";

export const ContainerButton = styled.button`
    background-color: ${props => props.theme.purple};
    border-radius: 8px;
    width: 100%;
    height: 52px;
    border: none;
    cursor: pointer;
    font-size: 30px;
    color: ${props => props.theme.white};

    &:hover {
        background-color: ${props => props.theme.secondDarkPurple};
    }

    &:active {
        opacity: .9;
    }
`