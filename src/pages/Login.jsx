import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate("")

    return (
      <div className="container py-5">
        <div className="sign-in mx-auto p-3">

          <div className="text-center">
            <h1>Logga in</h1>
          </div>

          <form action="">

            <input 
              type="email"
              placeholder="E-post"  
            />
            <input 
              type="password"
              placeholder="Lösenord"
            />

            <button className="btn btn-primary py-2 mb-3" type="submit">Logga in</button>

            <div className="form-check mb-4">
              <p>Glömt lösenord? <NavLink to={"/reset-password"}>Återställ här</NavLink></p>
            </div>

          </form>

        </div>
      </div>
    );
  }
  
  export default Login;
  