import "./Header.css";
import Scale from "./Scale";
import { ReactComponent as Icon } from "../svg/telegram-svgrepo-com.svg";
import { useState } from "react";

type Props = {
  getZoom: (zoom: string) => void;
};

const Header = ({ getZoom }: Props) => {
  return (
    <header className="header">
      <p className="logo">
        Services <span className="logo-count">0</span>
      </p>
      <div className="wrapper">
        <div className="wrapper">
          <div className="list-wiew">LIST VIEW</div>
          <div className="tooltip-container">
            <button
              onClick={() => getZoom("1%")}
              className="button "
              type="button"
            >
              <Icon />
            </button>
            <div className="tooltip-text">Go to center</div>
          </div>
        </div>
        <Scale getZoom={getZoom}></Scale>
      </div>
    </header>
  );
};

export default Header;
