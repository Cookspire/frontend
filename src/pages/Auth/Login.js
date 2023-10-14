import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JSON_HEADERS, PATH, URL } from "../../environment/APIService";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [submit, setSubmit] = useState(false);

  async function verifyUserService() {
    fetch(URL.API_URL + PATH.VERIFY_USER, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(userDetails),
    })
      .then((resp) => {
        setSubmit((prev) => !prev);
        if (resp.status === 200) {
          return resp.json();
        } else {
          return console.log("throw popup error!");
        }
      })
      .then((data) => {
        if (data) {
          navigate("/home");
        }
      })
      .catch((err) => {
        return err;
      });
  }

  function verifyUser(e) {
    e.preventDefault();
    setSubmit((prev) => !prev);
    verifyUserService();
  }

  return (
    <div className="center-modal">
      <div className="center-content">
        <div className="center-content-header">
          <div className="auth-header">Sign in to CookSpire</div>
        </div>

        <div className="center-content-body">
          <form className="auth-form" onSubmit={verifyUser}>
            <div className="form-field">
              <div className="field-label">
                <label htmlFor="email">Email</label>
              </div>

              <div className="field-content">
                <input
                  required
                  type="text"
                  id="email"
                  placeholder="foodie@example.com"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-label">
                <label htmlFor="password">Password</label>
              </div>

              <div className="field-content">
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="secret recipe..."
                  value={userDetails.password}
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="form-button">
              {!submit && (
                <div className="field-button">
                  <button type="submit">Sign In</button>
                </div>
              )}

              {submit && (
                <div className=" field-button disabled">
                  <button type="submit" className="disabled">
                    Signing In...
                    <div className="side-loader">
                      <div className="loader"></div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="center-content-footer">
          <div className="auth-footer">
            New to CookSpire? &nbsp;<a href="/register">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
