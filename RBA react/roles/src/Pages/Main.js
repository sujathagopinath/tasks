import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../components/User";
import Admin from "../components/Admin";
import Mod from "../components/Mod"
const Main = () => {
    const [role, setRole] = useState('')
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('https://localhost:3001/login').then((res) => {
            if (res.data.loggedIn == true) {
                setRole(res.data.user[0].role)
            }
        })
    },[])
    return (
        <div>
{role == "user" && <User/>}
{role == "admin" && <Admin/>}
{role == "mode" && <Mod/>}
        </div>
    )
}

export default Main