import "./index.css";
export default function Login() {
  return (
    <div className="center-modal">
      <div className="center-content">
        <div className="center-content-header">Sign in to CookSpire</div>
        <div className="center-content-body">
            <div className="login-form">
                <label>Email</label>
                <input type="text" placeholder="hello@example.com"/>
            </div>
        </div>
      </div>
    </div>
  );
}
