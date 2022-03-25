import React, { useState } from 'react'

export const LoggedIn = () => {
    const [isLoggedin, setLoggedIn] = useState(false)
    const handleLogIn = () => {
        setLoggedIn(true)
    }

    const handleLogout = () => {
        setLoggedIn(false)
    }
    return (
        <div>
            <button onClick={handleLogIn} >Login </button>
            <button onClick={handleLogout}>Logout</button>
            <div> user is {isLoggedin ? "logged in" : "logged out"}</div>
        </div>
    )
}