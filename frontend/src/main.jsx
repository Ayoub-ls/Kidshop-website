import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import './index.css'
import App, { STRAPI_URL } from './App.jsx'
import GlobalContext from './context/GlobalContext.jsx';
const client = new ApolloClient({
  link: new HttpLink({ uri: `${STRAPI_URL}/graphql` }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <ApolloProvider client={client}>
          <GlobalContext>
            <App />
          </GlobalContext> 
      </ApolloProvider>
      </BrowserRouter>
  </StrictMode>,
)
