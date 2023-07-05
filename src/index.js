import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import App from "./views/examples/Web3Logic/MainApp.js";
import Food from "./views/pizzahouse/App.js";
import Game from "./views/game/App.js";
import Game2 from "./views/game2/App.js";

import { SuiDevnetChain, WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

const router = createBrowserRouter([
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/game2",
    element: <Game2 />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/main-app",
    element: <App />,
  },
  {
    path: "/login-page",
    element: <Login />,
  },
  {
    path: "/profile-page",
    element: <Profile />,
  },
  {
    path: "/register-page",
    element: <Register />,
  },
  {
    path: "/food",
    element: <Food />,
  },
  {
    path: "/",
    element: <Landing />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider chains={[SuiDevnetChain]}>
      <RouterProvider router={router} />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
