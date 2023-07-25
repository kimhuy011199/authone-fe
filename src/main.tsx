import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './stores/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          body: 'Outfit',
        },
        components: {
          Button: {
            baseStyle: {
              fontWeight: 'medium',
            },
          },
          Heading: {
            baseStyle: {
              fontFamily: 'Outfit',
              fontWeight: 'medium',
            },
          },
        },
      })}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
