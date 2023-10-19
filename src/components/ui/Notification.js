import { useContext, useEffect, useState } from "react";
import {
  NotificationDataContext,
  UpdateNotificationContext,
} from "../../context/NotificationContext";
import "../styles/Notification.css";
import ReactDom from "react-dom";

export default function Notification() {
  const notificationData = useContext(NotificationDataContext);

  const updateNotificationData = useContext(UpdateNotificationContext);

  const [showClose, setShowClose] = useState(false);

  let timerId;
  const timer = () =>
    (timerId = setTimeout(() => {
      updateNotificationData(false, "", "");
    }, 5000));

  useEffect(() => {
    if (notificationData.show) {
      timer();
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [notificationData.show]);

  return ReactDom.createPortal(
    <>
      {notificationData.show && (
        <div className="pop-up">
          <div
            className="pop-content"
            onClick={() => {
              updateNotificationData(false, "", "");
              clearTimeout(timerId);
            }}
          >
            <span>&times;</span>
          </div>

          <div className="pop-message">
            <span>{notificationData.data.message}</span>
          </div>
        </div>
      )}
    </>,
    document.getElementById("notify-portal")
  );
}
