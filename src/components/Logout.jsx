import {auth} from "../firebaseconfig";
import {signOut} from "firebase/auth";
import React from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()
    
    const handleLogOut = async () => {
        try{
            await signOut(auth);
            navigate("login"); // Skicka användaren till login efter utloggning
        } catch(err){
            console.error("Fel vid utloggning", err);
        }
    }

  return (
    <button className="btn btn-secondary logout-btn" onClick={handleLogOut}>
        logga ut
    </button>
  )
}

export default Logout