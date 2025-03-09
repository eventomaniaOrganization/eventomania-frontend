import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {auth} from '../firebaseconfig'
import {createUserWithEmailAndPassword} from "firebase/auth" // Skapa konto
import { sendEmailVerification } from "firebase/auth";  // Skicka verifieringsmail

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("")

    if (password !== confirmPassword){
      setError("Lösenorden matchar inte")
      return;
    }

    try{
      const userCendetial = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCendetial.user

      // skicka verifieringsmail
      await sendEmailVerification(user)
      alert("Ett verifieringsmail har skickats. Kontrollera din inkorg.")

      navigate("/login"); //skicka andvändaren till login efter signup
    } catch(err){
        if(err.code === "auth/email-already-in-use"){
          setError("E-postadressen används redan. Försök att logga in.")
        }
        else if(err.code === "auth/weak-password"){
          setError("Lösenordet måste vara minst 6 tecken långt.")
        }
        else{
          setError("Ett oväntat fel uppstod. Försök igen.")
        }
    }
  }

    return (
      <div className="container py-5">
        <div className="sign-up mx-auto p-3">
          <div className="text-center mb-4">
            <h1 className="fw-bold">Skapa konto</h1>
            <p>Redan har Ticketmaster konto? <NavLink to={"/login"}>Logga in</NavLink></p>
          </div>
          
          <form onSubmit={handleSignup}>
          {error && <p className="error">{error}</p>}
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
  