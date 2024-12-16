import { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

const globlalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: ${props => props.theme.poppinsFont};
        font-weight: 400;
        font-style: normal;
    }

    button, a {
        cursor: pointer;
    }
`;

export default globlalStyles;
