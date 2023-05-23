import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import User from "./User";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <div style={{ height: "100vh" }} className="center-content">
      <ApolloProvider client={client}>
        <User />
      </ApolloProvider>
    </div>
  );
}

export default App;
