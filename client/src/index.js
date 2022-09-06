import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/chilanka';

const theme = extendTheme({
  colors: {
    transparent: 'transparent',
    groovy: {
      pink: '#ffc1c4',
      red: '#ff5730',
      orange: '#f96a10',
      lightorange: '#f98d36',
      mustard: '#f2a814',
      yellow: '#fed070',
      lightgreen: '#abcf83',
      green: '#5f851b',
      teal: '#66cbd0',
      lightblue: '#b4edff',
      blue: '#1c98b9',
      purple: '#b6abe3',
      cream: '#fffff6',
    },
  },
  textStyles: {
    fontFamily: 'Chilanka',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
