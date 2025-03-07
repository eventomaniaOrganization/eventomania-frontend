import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {auth} from '../firebaseconfig'
import {createUserWithEmailAndPassword} from "firebase/auth"

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
      setError("Lösenorden matchar inte")
      return;
    }

    try{
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/login"); //skicka andvändaren till login efter signup
    } catch(err){
        setError(err.message);
    }
  }

    return (
      <div className="container py-5">
        <div className="sign-up mx-auto p-3">
          <div className="text-center mb-4">
            <h1 className="text-primary fw-bold">Skapa konto</h1>
            <p>Redan har Ticketmaster konto? <NavLink>Logga in</NavLink></p>
          </div>
          {error && <p className="error">{error}</p>}
          
          <form onSubmit={handleSignup}>
            
            <input 
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              type="password"
              placeholder="Bekräfta lösenord"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary py-2 mb-3" type="submit">Registrera</button>

            <div className="form-check mb-4">
              <input type="checkbox" />
                <p>Genom att fortsätta förbi denna sida godkänner du våra Villkor
                  och förstår att information kommer att användas enligt beskrivningen i vår
                  Integritetspolicy</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Signup;
  