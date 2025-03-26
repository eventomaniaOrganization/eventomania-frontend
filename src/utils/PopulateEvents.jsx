import React, { useState } from 'react'
import { populateLargeEvent } from './populateLargeEvent'

const PopulateEvents = () => {
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePopulate = async () => {
        setLoading(true)
        setStatus("Skapar event....")

        await populateLargeEvent(500)

        setLoading(false)
        setStatus("alla event är skapade!")
    }

    return (
        <div className='container py-5'>
            <button 
                className='btn btn-primary'
                onClick={handlePopulate}
                disabled={loading}
            >
                {loading ? "Skapar..." : "Starta generering"}
            </button>

            {status && <p>{status}</p>}
        </div>
    )
}

export default PopulateEvents