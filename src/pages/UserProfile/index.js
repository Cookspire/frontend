import { useContext } from "react";
import { UserDataContext } from "../../context/UserContext";
import "./index.css";

export default function Test() {
  const userData = useContext(UserDataContext);

  return (
    <div className="test">
      <h1>Hello + {userData.email}</h1>
    </div>
  );
}
