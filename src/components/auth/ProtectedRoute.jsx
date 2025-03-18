import React, { useEffect, useState } from 'react'
import {auth} from "../../firebaseconfig"
// för att kolla om andvändaren är inloggad
import {onAuthStateChanged} from "firebase/auth"
import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = () => {
    const [user, setUser] = useState(null) // state för att spara den inloggade användaren
    const [loading, setLoading] = useState(true) // state för att hantera laddningsstatus

    useEffect(() =>{
        // lyssna på autentiseringsstatus (om användaren är inloggad eller ej)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });

        return () => unsubscribe() // stänger av lyssnaren när komponenten avmonteras
    }, [])

    if(loading) return <p>Laddar...</p>

    // om en användare är inloggad, visa den skyddade sidan (`Outlet`)
  return user ? <Outlet/> : <Navigate to="/login" replace/>
}

export default ProtectedRoute