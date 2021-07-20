import React, { useState } from 'react';
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
        const employee = this.state.Alldata.find(item => item.id === id);
        return employee;

    }

    onEdit = (id) => {
        const tempemp = this.state.Alldata;
        const index = tempemp.indexOf(this.getdata(id));
        const selected = tempemp[index];
        this.setState({
            id: selected['id'],
            Name: selected['Name'],
            Position: selected['Position'],
            Office: selected['Office'],
            Age: selected['Age'],
            Startdate: selected['Startdate'],
            Salary: selected['Salary']

        })
    }
    updateValue = (e, test) => {
        if (test === "Name") {
            this.state.Name = e.target.value;
        }
        if (test === "Position") {
            this.state.Position = e.target.value;
        }
        if (test === "Office") {
            this.state.Office = e.target.value;
        }
        if (test === "Age") {
            this.state.Age = e.target.value;
        }
        if (test === "Startdate") {
            this.state.Startdate = e.target.value;
        }
        if (test === "Salary") {
            this.state.Salary = e.target.value;
        }
        const temparr = [this.state.id, this.state.Name, this.state.Position, this.state.Office,
        this.state.Age, this.state.Startdate, this.state.Salary];
        this.setState({
            updateEdit: temparr
        })
    }
    onSave = (id) => {
        if (id !== '') {
            const Saved = this.state.Alldata;
            const index = Saved.indexOf(this.getdata(id));
            const Saveddata = Saved[index];
            Saveddata['Name'] = this.state.updateEdit[1];
            Saveddata['Position'] = this.state.updateEdit[2];
            Saveddata['Office'] = this.state.updateEdit[3];
            Saveddata['Age'] = this.state.updateEdit[4];
            Saveddata['Startdate'] = this.state.updateEdit[5];
            Saveddata['Salary'] = this.state.updateEdit[6];
            this.setState({
                Alldata: [...this.state.Alldata],
                id: '',
                Name: '',
                Position: '',
                Office: '',
                Age: '',
                Startdate: '',
                Salary: ''
            })

        } else {
            const MaxId = Math.max(...this.state.Alldata.map(item => item.id));
            const id = MaxId + 1;
            const newArr = [];
            newArr['Name'] = this.state.updateEdit[1];
            newArr['Position'] = this.state.updateEdit[2];
            newArr['Office'] = this.state.updateEdit[3];
            newArr['Age'] = this.state.updateEdit[4];
            newArr['Startdate'] = this.state.updateEdit[5];
            newArr['Salary'] = this.state.updateEdit[6];
            this.setState({
                Alldata: [...this.state.Alldata, newArr],
                id: '',
                Name: '',
                Position: '',
                Office: '',
                Age: '',
                Startdate: '',
                Salary: ''
            })

        }

    }
    onDelete = (id) => {
        const tempempo = this.state.Alldata.filter(item => item.id !== id);
        this.setState({
            Alldata: tempempo
        })
    }
    render() {
        // console.log(this.state.Alldata);
        return (
            <div>
                <EmployeeContext.Provider value={{
                    ...this.state,
                    onEdit: this.onEdit,
                    updateValue: this.updateValue,
                    onSave: this.onSave,
                    onDelete: this.onDelete
                }}>
                    {this.props.children}

                </EmployeeContext.Provider>

            </div>
        )
    }
}

// ReactDOM.render(<Context />, document.getElementById('context'));
const EmployeeConsumer = EmployeeContext.Consumer

export { EmployeeProvider, EmployeeConsumer }