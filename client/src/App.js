import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { StockProvider } from "./utils/GlobalState";

const httpLink = createHttpLink({
  uri: "graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

setInterval(client.resetStore, 1000 * 60);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <StockProvider>
            <Nav />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard">
                  <Route path=":username" element={<Dashboard />} />
                  <Route path="" element={<Dashboard />} />
                </Route> 
              </Routes>
            </div>
            <Footer />
          </StockProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
