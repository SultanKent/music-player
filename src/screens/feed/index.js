import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    APIKit.get("me/player/recently-played").then(function (response) {
      setRecentlyPlayed(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playTrack = (trackUri) => {
    navigate("/player", { state: { trackUri: trackUri } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {recentlyPlayed.map((item) => (
          <div
            className="playlist-card"
            key={item.track.id}
            onClick={() => playTrack(item.track.uri)}
          >
            <img
              src={item.track.album.images[0].url}
              className="playlist-image"
              alt="Track-Art"
            />
            <p className="playlist-title">{item.track.name}</p>
            <p className="playlist-subtitle">{item.track.artists[0].name}</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
