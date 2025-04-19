import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
    color: ${(props) => props.theme.colors.vibrantDark};
    background-color: ${(props) => props.theme.colors.vibrantLightGray};
    line-height: 1.7;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  img {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
`;
