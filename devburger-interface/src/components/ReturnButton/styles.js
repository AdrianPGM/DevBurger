import styled from "styled-components"


export const ReturnHome = styled.button`

@media screen and (max-width: 2000px){
    left: 5%;
}
    border: none;
    padding: 5px 5px 0px;


    position: absolute;
    left: 20px;
    top: -60px;
    


    background: ${props => props.theme.purple};
    border-radius: 10px;


    img {
        width: 35px;
    }
`