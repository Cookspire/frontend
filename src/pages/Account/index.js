import { useContext, useEffect } from "react";
import {
  NotificationDataContext,
  UpdateNotificationContext,
} from "../../context/NotificationContext";
import { NotificationType } from "../../environment/APIService";
import Notification from "../../components/ui/Notification";

export default function Account() {
  
  const notificationData = useContext(NotificationDataContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  useEffect(() => {
    setNotificationData(true, "Welcome to Accounts", NotificationType.INFO);
  }, []);

  return (
    <>
      {<Notification />}
      <h1>This is accont section</h1>
    </>
  );
}
