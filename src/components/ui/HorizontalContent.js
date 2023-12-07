import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useContext, useEffect, useRef, useState } from "react";
import "../styles/HorizontalContent.css";
import {
  APIResponse,
  BACKEND,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { NavLink } from "react-router-dom";

export default function HorizontalContent() {
  const customScroll = useRef();

  const setNotificationData = useContext(UpdateNotificationContext);

  const scrollRight = () => {
    customScroll.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    customScroll.current.scrollLeft -= 300;
  };

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchTrendingUsers();
  }, []);

  async function fetchTrendingUsers() {
    fetch(BACKEND.API_URL + PATH.FETCH_TRENDING_USERS, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setNotificationData(
            true,
            "Error occured while fetching trending users.",
            NotificationType.INFO
          );
        } else if (data) {
          setUserList(data);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

  return (
    <div className="content">
      <div className="child-left" onClick={scrollLeft}>
        <ArrowBackIosNewIcon htmlColor="white" />
      </div>

      <div className="scrollmenu" ref={customScroll}>
        {userList &&
          userList.map((x) => (
            <NavLink to={"/profile/" + x.email + "/posts"}>
              <div className="trending-type" key={x.id}>
                <div className="trending-img">
                  <img
                    src={
                      x.imageType != null && x.imageType === "url"
                        ? x.imageName
                        : "/posts/profile.svg"
                    }
                    alt="profile-pic"
                  />
                </div>

                <div className="trending-name">
                  {x.username}
                  <div className="badge">
                    {x.isVerified && (
                      <img
                        className="verified"
                        src="/Verified/verified.svg"
                        alt="verified"
                      />
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
      </div>

      <div className="child-right" onClick={scrollRight}>
        <ArrowForwardIosIcon htmlColor="white" />
      </div>
    </div>
  );
}
