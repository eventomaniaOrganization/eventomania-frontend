import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {auth} from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate("")

  const handleSignin = async (e) => {
    e.preventDefault()
    setError("")

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password )
      const user = userCredential.user;

      if(!user.emailVerified){
        setError("Verifiera din e-postadress innan du loggar in")
        return;
      }

      navigate("/dashboard") // Skicka användaren till dashboard/start
    }catch(err){
      console.log("Firebase Error Code:", err.code); // Debugging

      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Felaktig e-postadress eller lösenord.");
      } 
      else if(err.code === "auth/invalid-email"){
        setError("Du måste ange en e-postadress.")
      }
      else if (err.code === "auth/missing-password") {
        setError("Lösenord saknas. Vänligen fyll i ditt lösenord.");
      } 
      else {
        setError("Något gick fel. Försök igen.");
      }
    }

  }

    return (
      <div className="container py-5">
        <div className="sign-in mx-auto p-3">

          <div className="text-center mb-4">
            <h1>Logga in</h1>
            <p>Har du inget konto? <NavLink to={"/Signup"}>Skapa konto</NavLink></p>
          </div>

          <form onSubmit={handleSignin}>
            {error && <p className="error">{error}</p>}
            <input 
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
            <input 
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary py-2 mb-3" type="submit">Logga in</button>

            <div className="mb-4">
              <p>Glömt lösenord? <NavLink to={"/reset-password"}>Återställ här</NavLink></p>
            </div>

          </form>

        </div>
      </div>
    );
  }
  
  export default Login;
  