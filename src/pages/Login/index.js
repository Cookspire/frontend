import "./index.css";
export default function Login() {
  return (
    <div className="center-modal">
      <div className="center-content">
        <div className="center-content-header">
          <div className="auth-header">Sign in to CookSpire</div>
        </div>

        <div className="center-content-body">
          <form className="auth-form">
            <div className="form-field">
              <div className="field-label">
                <label htmlFor="email">Email</label>
              </div>

              <div className="field-content">
                <input
                  type="text"
                  id="email"
                  placeholder="foodie@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-label">
                <label htmlFor="password">Password</label>
              </div>

              <div className="field-content">
                <input
                  type="password"
                  id="password"
                  placeholder="secret recipe..."
                  required
                />
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
          <div className="auth-footer">
            New to CookSpire? &nbsp;<a href="/register">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
}
