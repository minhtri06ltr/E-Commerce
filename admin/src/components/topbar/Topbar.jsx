import React from "react";
import "./topbar.css";
import {
  ExitToApp,
  Language,
  Settings,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/userRedux";

export default function Topbar() {
  const dispatch = useDispatch()
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">HOLO Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer"
          onClick = {e=>{
            e.preventDefault();
            dispatch(logoutSuccess())
          }}
          >
            <ExitToApp  />
           
          </div>
          <div className="topbarIconContainer">
            {/* <Language />
            <span className="topIconBadge">
              0
            </span> */}
          </div>
          {/* <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img
            src="https://i.redd.it/5m2flzftc3e71.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
