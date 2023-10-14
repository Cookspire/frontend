import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  function logout() {
    navigate("/login");
  }

  return (
    <>
      <h1>This is accont section</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
}
