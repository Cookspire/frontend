import "../styles/PasswordSettings.css";

export default function PasswordSettings() {
  return (
    <div className="settings-content">
      <div className="sensitive">
        <div className="heading">Password Settings</div>

        <div className="sub-heading">
          Change your password here. After saving, you'll be logged out.
        </div>

        <form className="general-form">
          <div className="field">
            <div className="field-label">
              <label htmlFor="oldPassword">Old Password</label>
            </div>

            <div className="field-input">
              <input id="oldPassword" type="password" />
            </div>
          </div>

          <div className="field">
            <div className="field-label">
              <label htmlFor="newPassword">New Password</label>
            </div>

            <div className="field-input">
              <input id="newPassword" type="password" />
            </div>
          </div>

          <div className="field">
            <div className="field-label">
              <label htmlFor="repeatPassword">Repeat Password</label>
            </div>
            <div className="field-input">
              <input id="repeatPassword" type="password" />
            </div>
          </div>

          <div className="action">
            <button>Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
