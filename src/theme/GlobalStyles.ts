import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    
  }
  body {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.25;
  }
  #root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }
  
  /* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
  box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}
input[data-autocompleted] {
    background-color: transparent !important;
}
/*Change text in autofill textbox*/
input:-webkit-autofill{
    -webkit-text-fill-color: inherit !important;
}
`;
