import React, { useState, useEffect } from "react";
import { Checkbox } from "./UI/Checkbox";
import { URLS } from "../constants";
import { Button, ButtonSize } from "./Button";
import { IconSuccess } from "./UI/Icon";

const PopupMessage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  // Check if the user has already seen the popup or opted to not show it again
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    if (doNotShowAgain) {
      localStorage.setItem("hasSeenPopup", "true");
    }
    setShowPopup(false);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoNotShowAgain(event.target.checked);
  };

  if (!showPopup) return null;

  return (
    <div className="credore-popup-backdrop fixed inset-0 z-50 flex justify-center items-center p-4">
      <div className="credore-popup w-full max-w-2xl p-5 sm:p-8 text-center">
        {/* Text content */}
        <div className="text-left mb-4">
          <h2 className="text-xl font-bold">
            <IconSuccess className="text-forest-500 mr-2" />
            Credore workspace update
          </h2>
          <p className="mt-4">Your credential workspace now includes additional transfer controls and audit context.</p>
          <ul className="mt-2 list-disc list-inside">
            <li>
              Latest iteration enabled new functions that can help you better align with the IG P&I requirement:
              <ul className="mt-1 list-disc list-inside pl-6">
                <li>
                  Reject function - Received a wrongfully transferred document, you may now reject it to where it came
                  from!
                </li>
                <li>Remark column - Any actions you take for your transferable document can now include a remark!</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Do not show again checkbox */}
        <div className="mt-4 flex items-center">
          <Checkbox id="doNotShowAgain" checked={doNotShowAgain} onChange={handleChangeCheckbox}>
            Do not show this again
          </Checkbox>
        </div>

        {/* Buttons - Dismiss and Learn More */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end mt-6 gap-3">
          {/* Dismiss Button */}
          <Button
            className="popup-secondary-button"
            size={ButtonSize.MD}
            onClick={handleClosePopup}
          >
            Dismiss
          </Button>

          {/* Learn More Button */}
          <a href={URLS.DOCS} target="_blank" rel="noopener noreferrer">
            <Button className="popup-primary-button w-full" size={ButtonSize.MD}>
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
