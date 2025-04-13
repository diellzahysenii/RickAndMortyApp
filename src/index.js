import React from "react";
import './i18n';
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "./index.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
