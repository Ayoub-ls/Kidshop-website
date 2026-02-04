import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import './index.css'
import App from './App.jsx'
import GlobalContext from './context/GlobalContext.jsx';
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:1337/graphql" }),
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
