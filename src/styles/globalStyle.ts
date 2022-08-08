import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Do Hyeon', sans-serif;
    }
    button{
        font-family: 'Do Hyeon', sans-serif;
    }
    input{
        font-family: 'Do Hyeon', sans-serif;
    }
`;