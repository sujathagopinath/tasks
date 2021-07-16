import React from 'react';
import ReactDOM from 'react';
import rowData from './appData'

class Context extends React.Component {
    state = {
        Alldata: rowData
    }
    render() {
        console.log(this.state.Alldata);
        return (
            <div>
                <Employee value={{ ...this.state }}>
                    {this.props.children}

                </Employee>

            </div>
        )
    }
}

// ReactDOM.render(<Context />, document.getElementById('context'));

export default Context
