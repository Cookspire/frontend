import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShowNavContext,
  ToggleShowNavContext,
} from "../../context/NavDialogContext";
import {
  APIResponse,
  JSON_HEADERS,
  PATH,
  URL,
} from "../../environment/APIService";

export default function Register() {

  const hideNavBar = useContext(ToggleShowNavContext);
  const showNav = useContext(ShowNavContext);

  useEffect(() => {
    if (showNav) {
      hideNavBar(false);
    }
  }, []);

  const [userForm, setUserForm] = useState({
    username: { value: "", err: "" },
    email: { value: "", err: "" },
    password: { value: "", err: "" },
    rpassword: { value: "", err: "" },
  });

  const [isValid, setValid] = useState(false);

  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);

  async function createUser(userData) {
    fetch(URL.API_URL + PATH.CREATE_USER, {
      method: "PUT",
      body: JSON.stringify({
        username: userData.username.value,
        email: userData.email.value,
        password: userData.password.value,
        country: "",
        isVerified: false,
        bio: "",
      }),
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        setSubmit(false);
        if (data !== APIResponse.BAD_REQUEST) {
          setUserForm({
            username: "",
            email: "",
            password: "",
            rpassword: "",
          });
          setValid(true);

          navigate("/login");
        } else {
          console.log("Error during API call.");
        }
      })
      .catch((err) => {
        return console.log("Error Occured, Reason : " + err);
      });
  }

  function formErrorHandler(field, value) {
    let response = "";
    switch (field) {
      case "username":
        if (!/^[A-Za-z0-9]{5,20}$/.test(value)) {
          response = "*Min: 5, Max: 20 AlphaNumeric characters.";
        }
        break;
      case "email":
        if (!/^[a-z0-9]{3,90}[@]([a-z]){3,20}[.](com|org|net)$/.test(value))
          response = "*Format: yourname@example.com";
        break;
      case "password":
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(
            value
          )
        )
          response =
            "*Min: 8, Max: 50. Password should have combination of lowerCase, upperCase, number, symbol";
        if (userForm.rpassword.value !== value) {
          setUserForm((prev) => ({
            ...prev,
            rpassword: {
              ...prev.rpassword,
              err: "*Passwords aren't matching",
            },
          }));
          document
            .getElementById("rpassword")
            .style.setProperty("--fieldBorder", "1px solid hsl(0, 100%, 50%)");
          document
            .getElementById("rpassword")
            .style.setProperty("--fieldBorder", "1px solid hsl(0, 100%, 50%)");
        } else {
          setUserForm((prev) => ({
            ...prev,
            rpassword: {
              ...prev.rpassword,
              err: "",
            },
          }));
        }
        break;
      case "rpassword":
        if (!(value === userForm.password.value))
          response = "*Passwords aren't matching";
        break;
      default:
        response = "";
    }

    if (response !== "") {
      document
        .getElementById(field)
        .style.setProperty("--fieldBorder", "2px solid hsl(0, 100%, 50%)");
    } else {
      document
        .getElementById(field)
        .style.setProperty("--fieldBorder", "2px solid hsl(0, 0%, 0%, 0.17)");
    }

    return response;
  }

  const changeValues = (e) => {
    const errResponse = formErrorHandler(e.target.id, e.target.value);
    setUserForm((prev) => ({
      ...prev,
      [e.target.id]: { value: e.target.value, err: errResponse },
    }));
    if (
      userForm.username.value.length > 0 &&
      userForm.email.value.length > 0 &&
      userForm.password.value.length > 0 &&
      userForm.rpassword.value.length > 0 &&
      errResponse === ""
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    setSubmit((prev) => !prev);
    createUser(userForm);
  };

  return (
    <div className="center-modal">
      <div className="center-content">
        <div className="center-content-header">
          <div className="auth-header">Join CookSpire today!</div>
        </div>

        <div className="center-content-body">
          <form className="auth-form" onSubmit={submitForm}>
            <div className="form-field">
              <div className="field-label">
                <label htmlFor="username">Username</label>
              </div>

              <div className="field-content">
                <input
                  type="text"
                  id="username"
                  placeholder="foodie name..."
                  onChange={changeValues}
                  value={userForm.username.value}
                  required
                />
              </div>
              {userForm.username.err && userForm.username.err.length > 0 && (
                <div className="err-msg">{userForm.username.err}</div>
              )}
            </div>

            <div className="form-field">
              <div className="field-label">
                <label htmlFor="email">Email</label>
              </div>

              <div className="field-content">
                <input
                  type="text"
                  id="email"
                  placeholder="foodie@example.com"
                  onChange={changeValues}
                  value={userForm.email.value}
                  required
                />
              </div>
              {userForm.email.err && userForm.email.err.length > 0 && (
                <div className="err-msg">{userForm.email.err}</div>
              )}
            </div>

            <div className="form-field">
              <div className="field-label">
                <label htmlFor="password">Password</label>
              </div>

              <div className="field-content">
                <input
                  type="password"
                  id="password"
                  placeholder="shh..."
                  onChange={changeValues}
                  value={userForm.password.value}
                  required
                />
              </div>
              {userForm.password.err && userForm.password.err.length > 0 && (
                <div className="err-msg">{userForm.password.err}</div>
              )}
            </div>

            <div className="form-field">
              <div className="field-label">
                <label htmlFor="password">Repeat Password</label>
              </div>

              <div className="field-content">
                <input
                  type="password"
                  id="rpassword"
                  placeholder="repeat your secret..."
                  onChange={changeValues}
                  value={userForm.rpassword.value}
                  required
                />
              </div>
              {userForm.rpassword.err && userForm.rpassword.err.length > 0 && (
                <div className="err-msg">{userForm.rpassword.err}</div>
              )}
            </div>

            <div className="form-button">
              {!submit && (
                <div className="field-button">
                  <button type="submit" disabled={!isValid}>
                    Create an account
                  </button>
                </div>
              )}

              {submit && (
                <div className=" field-button disabled">
                  <button type="submit" className="disabled">
                    Creating Account...
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
            Already a user? &nbsp;<a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}
