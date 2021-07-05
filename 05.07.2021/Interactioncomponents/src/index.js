import React from 'react';
import ReactDOM from 'react-dom';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedsalary: null
        }

        // console.log(this.props);
        // this.props.Name = "suja";
    }
    getupdatedsalary = (salary) => {
        this.setState({ updatedsalary: salary });
    }
    render() {
        return <div>
            <h1>Employee Information</h1>
            <label>
                Employee Id: <b>{this.props.Id}</b>
            </label><br />
            <label>
                Employee Name: <b>{this.props.Name}</b>
            </label><br />
            <label>
                Employee Location: <b>{this.props.Location}</b><br />
            </label>
            <label>
                Total Salary: <b>{this.props.Salary}</b>
            </label><br />
            <label>Updated Total Salary: <b>{this.state.updatedsalary}</b></label>
            <Salary Basic={this.props.Basic} HRA={this.props.HRA} SpecialAllowances={this.props.SpecialAllowances}></Salary>

        </div>;
    }
}

class Salary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: this.props.Basic,
            hra: this.props.HRA,
            SpecialAllowances: this.props.SpecialAllowances
        }

    }
    updatedsalary = () => {
        let salary = parseInt(this.ref.basic.value) + parseInt(this.ref.hra.value) + parseInt(this.ref.SpecialAllowances.value);
        this.props.onSalarychange(salary);



    }
    render() {
        return <div>
            <h1>Salary Information</h1>
            <label>
                Basic: <input type="text" ref="basic" defaultValue={this.props.Basic}></input>
            </label><br /><br />
            <label>
                HRA: <input type="text" ref="hra" defaultValue={this.props.HRA}></input>
            </label><br /><br />
            <label>
                SpecialAllowances: <input type="text" ref="SpecialAllowances" defaultValue={this.props.SpecialAllowances} onSalarychange={this.getupdatedsalary}></input>
            </label><br /><br />
            <button onClick={this.updatedsalary}>Update</button>
        </div>
    }
}


const element = <EmployeeInfo Name="sujatha" Id="101" Location="Bangalore" Salary="50000" Basic="Development" HRA="201" SpecialAllowances="1500">

</EmployeeInfo>

ReactDOM.render(element, document.getElementById("root"));


