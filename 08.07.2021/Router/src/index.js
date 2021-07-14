import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './pages/About';

function App() {
    return (
        <div className="wrapper">
            <h1>Marine Mammals</h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
