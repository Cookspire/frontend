import { Route, Routes } from "react-router-dom";
import Account from "../pages/Account";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome"

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Page not found 404!</h1>}></Route>

        <Route path="/" element={<Welcome />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/register" element={<Register />}></Route>

        <Route path="/home" element={<Home />}></Route>

        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </>
  );
}
