import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../spotify";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [image, setImage] = useState(
    "https://www.pngplay.com/wp-content/uploads/12/Killua-Zoldyck-PNG-Images-HD.png"
  );
  const [tokenExists, setTokenExists] = useState(Boolean(localStorage.getItem("token")));
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    setTokenExists(false);
    apiClient.resetState();
  };
  useEffect(() => {
    setTokenExists(Boolean(localStorage.getItem("token")));
  }, []);

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      {/* Disable the "Sign Out" button when token doesn't exist */}
      <button onClick={handleSignOut}
      style={{border: 'none', background: 'transparent'}}
      className="btn-body active">
        <FaSignOutAlt style={{width: '50px', height: '50px'}}/>
      </button>
    </div>
  );
}
