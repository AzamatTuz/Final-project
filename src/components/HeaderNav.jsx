import React, { useEffect, useState } from "react";
import HeaderBtns from "./HeaderBtns";
import { Link } from "react-router-dom";
import axios from "axios";

function HeaderNav() {
  const token = localStorage.getItem("token");
  const [isLoged, setIsLoged] = useState(false)
  const [profileImage, setProfileImage] = useState()

  async function getUser() {
    try {

      const result = await axios.get("https://peer2p-back.onrender.com/profile", {
        headers: {
          "authorization": `Bearer ${token}`,
        },
      });

      if (result.data.length > 0) {
        setIsLoged(true)
        setProfileImage(result.data[0].profile_image);
    
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="flex justify-between w-full pl-22 pr-15">
      <HeaderBtns to="/" text="Home" icon="/images/Home.png" />
      <HeaderBtns to="/about" text="About" icon="/images/About.png" />
      <HeaderBtns to="/catalog" text="Catalog" icon="/images/Catalog.png" />
      <HeaderBtns to="/favourites" text="Favourites" icon="/images/heart_head.png"/>
      <HeaderBtns to="/notifications" text="Notification" icon="/images/Chats.png" />
      {isLoged ? <Link to={"/profile"}><img className="w-15 bg-white rounded-full border-2 border-[#ADC178]" src={`https://peer2p-back.onrender.com/uploads/${profileImage}`} alt=""/></Link> : <HeaderBtns to="/authorization" text="Login/Register" icon="/images/Login.png" />}
    </nav>

  );
}

export default HeaderNav;
