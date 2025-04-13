import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Make sure it's 'react-dom/client'
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "./index.css"; // Optional, if you're using CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
