import { useRef, useEffect } from "react";

export default function CloseModal(handler, checkCondition) {
  const customRef = useRef();

  const clickOutsideHandler = (e) => {
    if (customRef.current.contains(e.target) === false) {
      handler();
    }
  };

  useEffect(() => {
    if (checkCondition) {
      document.addEventListener("mousedown", clickOutsideHandler);
    }
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  });
  return customRef;
}
