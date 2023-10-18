import { createContext, useState, useEffect } from "react";

export const UpdateNotificationContext = createContext();

export const NotificationDataContext = createContext();

export function NotificationContext({ children }) {
  const [notificationData, setNotificationData] = useState({
    show: false,
    data: {
      message: "",
      type: "",
    },
  });

  const updateNotification = (isShown, message, type) => {
    setNotificationData((prev) => ({
      ...prev,
      show: isShown,
      data: {
        message: message,
        type: type,
      },
    }));
  };

  useEffect(()=>{
    console.log("show pop up")
  },[notificationData])

  return (
    <NotificationDataContext.Provider value={notificationData}>
      <UpdateNotificationContext.Provider value={updateNotification}>
        {children}
      </UpdateNotificationContext.Provider>
    </NotificationDataContext.Provider>
  );
}
