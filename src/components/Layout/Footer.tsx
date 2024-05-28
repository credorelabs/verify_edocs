import React from "react";
import './footer.css'
import { GitHub } from "@mui/icons-material";


export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="footer">
    <div className="container">

      <div className="copyrightSectn">
        <div>
          &#169; Copyright {new Date().getFullYear()} Credore - All rights
          Reserved
        </div>
        <div className="mediaLinks items-center">
          <ul className="otherLinks">
           <a href="https://github.com/credorelabs/verify_edocs" className="text-white">
           <GitHub fontSize="large" color="inherit"/>
           </a>
          </ul>
        </div>
      </div>
    </div>
    {/* <Form isOpen={isOpen} closeModal={closeModal} openModal={openModal} /> */}
  </footer>
  );
};
