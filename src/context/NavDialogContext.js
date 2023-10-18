import { createContext, useState } from "react";

export const ShowNavContext = createContext();

export const ToggleShowNavContext = createContext();

export default function NavDialogContext({ children }) {
  const [showDialog, setShowDialog] = useState(true);

  const showNav = (status) => {
    setShowDialog(status);
  };

  return (
    <ShowNavContext.Provider value={showDialog}>
      <ToggleShowNavContext.Provider value={showNav}>
        {children}
      </ToggleShowNavContext.Provider>
    </ShowNavContext.Provider>
  );
}
