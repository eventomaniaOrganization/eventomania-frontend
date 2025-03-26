import React, { useState } from 'react'
import {db} from "../firebaseConfig"
import {collection, addDoc} from "firebase/firestore"


const CreateEvent = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            title,
            description,
            image: "https://source.unsplash.com/800x400/?event",
            address: {
              text: "Helsingborg, Sverige",
              lat: 56.0465,
              lon: 12.6945
            },
            startDateTime: "2024-08-15T18:00:00",
            endDateTime: "2024-08-15T22:00:00",
            category: "Konsert",
            price: 200,
            registrationLink: "https://example.com/anmalan",
            moreInfoLink: "https://example.com/info"
        }

        try{
            await addDoc(collection(db, "events"), newEvent)
            alert("event skapades")
            setTitle("")
            setDescription("")
        }
        catch(err){
            console.error("något gick fel", err)
        }
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='container py-5'>
            <h2>skapa event</h2>
                <input 
                    type="text" 
                    placeholder='Title' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className ="form-control"
                    required
                />

                <textarea 
                placeholder='beskrivning'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
                />
                <button className='btn btn-primary mt-3' type='submit'>Skapa</button>

        </form>
    </div>
  )
}

export default CreateEvent