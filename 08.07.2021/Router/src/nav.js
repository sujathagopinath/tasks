import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
function Nav() {
    return (
        <div>
            <Link to="/home" >Home</Link><br />
            <Link to="/about" >About</Link>
        </div>
    )
}

export default Nav
