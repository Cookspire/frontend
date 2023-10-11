export default function Register(){

    return(
        
    <div className="center-modal">
    <div className="center-content">
      <div className="center-content-header">
        <div className="auth-header">Join CookSpire today!</div>
      </div>

      <div className="center-content-body">
        <form className="auth-form">

        <div className="form-field">
            <div className="field-label">
              <label htmlFor="username">Username</label>
            </div>

            <div className="field-content">
              <input
                type="text"
                id="username"
                placeholder="foodie name..."
                required
              />
            </div>
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
                placeholder="shh..."
                required
              />
            </div>
          </div>

          <div className="form-field">
            <div className="field-label">
              <label htmlFor="password">Repeat Password</label>
            </div>

            <div className="field-content">
              <input
                type="password"
                id="rpassword"
                placeholder="repeat your secret recipe..."
                required
              />
            </div>
          </div>

          <div className="form-button">
            <div className="field-button">
              <button type="submit">Create an account</button>
            </div>
          </div>
        </form>
      </div>

      <div className="center-content-footer">
        <div className="auth-footer">
          Already a user? &nbsp;<a href="/login">Login</a>
        </div>
      </div>
    </div>
  </div>
    )
}