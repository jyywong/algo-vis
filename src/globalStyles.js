import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
     *,
    *::after,
    *::before {
        margin:0;
        padding: 0;
        box-sizing: inherit;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
`;

export default GlobalStyle;
