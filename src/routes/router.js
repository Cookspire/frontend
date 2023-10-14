import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Page not found 404!</h1>}></Route>
        <Route path="/">
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>

        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}
