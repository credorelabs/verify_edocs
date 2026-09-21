import React, { useEffect, useState } from "react";
import { Button, ButtonSize } from "./Button";
import Cookies from "js-cookie";

const COOKIE_KEY = "cookieNotice";
const COOKIE_CLOSED_VALUE = "closed";

const CookieNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieValue = Cookies.get(COOKIE_KEY);
    if (!cookieValue || cookieValue !== COOKIE_CLOSED_VALUE) {
      setVisible(true);
      setTimeout(() => setShow(true), 30);
    }
  }, []);

  const handleClose = () => {
    Cookies.set(COOKIE_KEY, COOKIE_CLOSED_VALUE, { expires: 30, path: "/" });
    setShow(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`credore-cookie fixed bottom-0 left-0 w-full py-3 px-4 flex flex-col sm:flex-row gap-3 items-center justify-center z-[100] transition-transform duration-300 ease-in-out
        ${show ? "translate-y-0" : "translate-y-full"} shadow-lg`}
    >
      <span className="text-center sm:text-left text-sm sm:text-base">
        To offer you a better experience, this site uses cookies.
      </span>

      <Button
        className="cookie-close-button shrink-0"
        size={ButtonSize.SM}
        onClick={handleClose}
      >
        Close
      </Button>
    </div>
  );
};

export default CookieNotice;
