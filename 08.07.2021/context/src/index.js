import React from 'react';
import ReactDOM from 'react-dom';
import ComponentA from './ComponentA';
import { Userprovider } from './userContext';


class Index extends React.Component {
    render() {
        return (
            <div>
                <Userprovider value="sujatha">
                    <ComponentA />

                </Userprovider>
            </div>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'))