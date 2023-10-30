import "../styles/GeneralSettings.css";

export default function GeneralSettings() {
  return (
    <div className="settings-content">
      <form className="general-form">
        <div className="field">
          <div className="field-label">
            <label htmlFor="username">Username</label>
          </div>

          <div className="field-input">
            <input id="username" type="text" />
          </div>
        </div>

        <div className="field">
          <div className="field-label">
            <label htmlFor="bio">Bio</label>
          </div>

          <div className="field-input">
            <textarea id="bio" />
          </div>
        </div>

        <div className="field">
          <div className="field-label">
            <label htmlFor="country">Country</label>
          </div>

          <div className="field-input">
            <select id="country" type="text">
              <option>India</option>
              <option>Ireland</option>
              <option>America</option>
            </select>
          </div>
        </div>

        <div className="action">
          <button>Update Info</button>
        </div>
      </form>

      <hr />

      <form className="password-form">
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
  );
}
