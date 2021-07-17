import React from 'react';
import ReactDOM from 'react-dom';
import ComponentC from './ComponentC';
import { Userprovider } from './userContext';


class Index extends React.Component {
    render() {
        return (
            <div>
                <Userprovider value="sujatha">
                    <ComponentC />

                </Userprovider>
            </div>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'))