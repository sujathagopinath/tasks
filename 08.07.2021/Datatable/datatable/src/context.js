import React from 'react';
import ReactDOM from 'react';
import rowData from './appData'

const EmployeeContext = React.createContext(); //context

class EmployeeProvider extends React.Component {  //provider
    state = {
        Alldata: rowData,
        id: '',
        Name: '',
        Position: '',
        Office: '',
        Age: '',
        Startdate: '',
        Salary: '',
        updateEdit: []
    }
    getdata = (id) => {
        const employee
    }
    onEdit = (id) => {
        const tempemp = this.state.Alldata;
        const index = tempemp.indexOf(this.getdata(id));
    }
    render() {
        // console.log(this.state.Alldata);
        return (
            <div>
                <EmployeeContext.Provider value={{ ...this.state }}>
                    {this.props.children}

                </EmployeeContext.Provider>

            </div>
        )
    }
}

// ReactDOM.render(<Context />, document.getElementById('context'));
const EmployeeConsumer = EmployeeContext.Consumer

export { EmployeeProvider, EmployeeConsumer }