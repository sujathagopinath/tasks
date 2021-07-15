import { func } from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import About from './about';
import Home from './home';


function New() {
    return (
        <div className="wrapper">
            <Router>
                <Link to="/" >Home</Link><br />
                <Link to="/about" >About</Link>

                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
            </Router>
        </div>
    );
}
// function Home() {
//     return (
//         <div>
//             <h1>Home page</h1>
//             <p>This is a home page</p>
//         </div>
//     )
// }

// function About() {
//     return (
//         <div>
//             <h1>About page</h1>
//             <p>This is a About page</p>
//         </div>
//     )
// }
ReactDOM.render(<New />, document.getElementById('root'))

//Dynamic routing

// function Dynamic() {
//     let users = [
//         { name: 'AAA', id: 101 },
//         { name: 'ABC', id: 102 },
//         { name: 'XYZ', id: 103 },

//     ]
//     return (
//         <div>
//             <Router>
//                 <About />
//                 <Home />


//             </Router>

//         </div>
//     )
// }
// ReactDOM.render(<Dynamic />, document.getElementById('app'))