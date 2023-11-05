import { NavLink, Outlet } from "react-router-dom";
import "../styles/ProfileContent.css";

export default function Profile() {
  return (
    <div className="profile-content">
      <div className="profile-info">
        <div className="profile-image">
          <img src="/posts/profile.svg" alt="profile" />
        </div>
        <div className="profile-details">
          <div className="profile-name">Kanishkar</div>

          <div className="profile-stats">
            <div className="stats">
              <strong>10k &nbsp;</strong> posts
            </div>

            <div className="stats">
              <b>1M&nbsp;</b> followers
            </div>

            <div className="stats">
              <b>0&nbsp;</b> following
            </div>
          </div>

          <div className="profile-bio">Lets cook something interesting</div>
        </div>
      </div>

      <div className="profile-data">
        <nav>
          <NavLink to="/profile/1/posts">
            <div className="profile-nav">Posts</div>
          </NavLink>
          <NavLink to="/profile/1/followers">
            <div className="profile-nav">Followers</div>
          </NavLink>

          <NavLink to="/profile/1/followers">
            <div className="profile-nav">Following</div>
          </NavLink>
          <NavLink to="/profile/1/account/general">
            <div className="profile-nav">Account</div>
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
