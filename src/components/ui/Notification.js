import { useContext, useEffect } from "react";
import {
  NotificationDataContext,
  UpdateNotificationContext,
} from "../../context/NotificationContext";
import "../styles/Notification.css";

export default function Notification() {
  const notificationData = useContext(NotificationDataContext);

  const updateNotificationData = useContext(UpdateNotificationContext);

  let timerId;
  const timer = () =>
    (timerId = setTimeout(() => {
      updateNotificationData(false, "", "");
    }, 500000));

  useEffect(() => {
    if (notificationData.show) {
      // switch (notificationData.data.type) {
      //   case NotificationType.WARNING:
      //     document.documentElement.style.setProperty(
      //       "--popUp-color",
      //       "#ffd700cf"
      //     );
      //     break;
      //   case NotificationType.ERROR:
      //     document.documentElement.style.setProperty(
      //       "--popUp-color",
      //       "#ff0000b3"
      //     );
      //     break;
      //   case NotificationType.INFO:
      //     document.documentElement.style.setProperty(
      //       "--popUp-color",
      //       "#2f84daa6"
      //     );
      //     break;
      //   case NotificationType.SUCCESS:
      //     document.documentElement.style.setProperty(
      //       "--popUp-color",
      //       "darkGreen"
      //     );
      //     break;
      //   default:
      //     document.documentElement.style.setProperty(
      //       "--popUp-color",
      //       "#2f84daa6"
      //     );
      // }
      timer();
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [notificationData.show]);

  return (
    <>
      {notificationData.show && (
        <div className="pop-up">
          <div className="pop-up-content">
            <span>{notificationData.data.message}</span>
          </div>

          <div className="pop-up-content-two">
            <span
              onClick={() => {
                updateNotificationData(false, "", "");
                clearTimeout(timerId);
              }}
            >
              &times;
            </span>
          </div>
        </div>
      )}
    </>
  );
}
