import { useContext, useEffect } from "react";
import { UserDataContext } from "../../context/UserContext";
import "./index.css";

export default function UserProfile() {
  const userData = useContext(UserDataContext);

  useEffect(() => {
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      console.log("from test page::"+JSON.stringify(userData));
    }
  }, [userData]);

  if (!userData || !userData.email) {
    // You can return a loading indicator or any fallback UI here
    return <div>Loading...</div>;
  }

  return (
    <div className="test">
      <h1>Hello + {userData.email}</h1>
    </div>
  );
}
