import { useContext } from "react";
import { LogoutUserContext } from "../../context/UserContext";

export default function Account() {
  const logout = useContext(LogoutUserContext);

  return (
    <>
      <h1>This is accont section</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
}
