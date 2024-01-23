import { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    background-color: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
}

section {
    width: 70%;
    max-width: 800px;
    height: auto;
    background-color: #fff;
    margin: 20px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

html, body, #root {
    height: 100%;
    min-width: 500px;
}

button {
    cursor: pointer;
    background-color: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 700;
    transition: all 300ms;
    &:hover{
        filter: brightness(85%);
    }
}

a{
    text-decoration: none;
    color: ${colors.primaryColor};
}

ul {
    list-style: none;
}

:root  {
    --toastify-color-warning: ${colors.warningColor};
    --toastify-color-error: ${colors.errorColor};
    --toastify-color-info: ${colors.infoColor};

}
label {
    display: block;
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: bold;
}

form {
    .alert-text {
    font-size: 13px;
    color: #dede08;
    margin-bottom: 10px;
}
    width: 80%;
    div.div-btn {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        button {
            width: 50%;
        }
    }
}

`;
