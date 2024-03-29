import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NavDialogContext from "./context/NavDialogContext";
import { NotificationContext } from "./context/NotificationContext";
import PostContext from "./context/PostContext";
import { UserContext } from "./context/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContext>
      <NavDialogContext>
        <NotificationContext>
          <PostContext>
            <App />
          </PostContext>
        </NotificationContext>
      </NavDialogContext>
    </UserContext>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
