import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {auth} from "../firebaseConfig"
import {sendPasswordResetEmail} from "firebase/auth"

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate("")

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("")
        setMessage("")

        try {
            await sendPasswordResetEmail(auth, email)
            setMessage("En återställningslänk har skickats till din e-post.")
            setTimeout(() => navigate("/login"), 5000) // omdirigera efter 5 sekunder
        } 
        
        catch (err) {
            if(err.code === "auth/invalid-email"){
                setError("Felaktig e-postadress.")
            }
            else{
                setError("Något gick fel. Försök igen.");
            }
        }

    }

  return (
    <div className='container py-3'>
        <div className='reset-password mx-auto p-3'>
            <h1>Återställ lösenord</h1>
            <p>Ange din e-postadress för att få en återställningslänk.</p>
            
            {message && <p className='message'>{message}</p>}
            {error && <p className='error'>{error}</p>}

            <form onSubmit={handleResetPassword}>
                <input 
                type="email"
                placeholder='E-post'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button className='btn btn-primary' type='submit'>Skicka återställningslänk</button>
            </form>    

        </div>
    </div>
  )
}

export default ResetPassword