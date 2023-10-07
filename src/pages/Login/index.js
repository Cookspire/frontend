import "./index.css";
export default function Login() {
  return (
    <div className="center-modal">
      <div className="center-content">
        <div className="center-content-header">Sign in to CookSpire</div>

        <div className="center-content-body">
          <form className="login-form">
            <div className="form-field">
              <div className="field-label">
                <label>Email</label>
              </div>

              <div className="field-content">
                <input
                  type="text"
                  id="email"
                  placeholder="hello@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-label">
                <label>Password</label>
              </div>

              <div className="field-content">
                <input type="password" id="password" required />
              </div>
            </div>

            <div className="form-button">
              <div className="field-button">
                <button type="submit">Sign In</button>
              </div>
            </div>
          </form>
        </div>

        <div className="center-content-footer">
          New to CookSpire? <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
}
