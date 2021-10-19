import React from 'react';
import ReactDOM from 'react-dom';

const data = 'riya';
function test() {
    if (data === 'riya') return <div>{data}</div>;
    else return <div>Else part</div>
}

const element1 = (<div>
    <div className="detail">Happy learning</div>
    {test()}
</div>);

ReactDOM.render(element1, document.getElementById('app'))

function update() {
    const form = React.createElement('div', null, React.createElement('div', null, 'Fill in!!'),
        React.createElement('div', null, React.createElement('input', { type: 'text' })),
        React.createElement('h1', null, new Date().toLocaleTimeString()),
    );
    ReactDOM.render(form, document.getElementById('form'))
}
setInterval(update, 1000);


//functional components

function EmployeeDetails(employee) {

    return <div>
        <h1>Employee Details</h1>

        <label>
            Employee Name: <b>{employee.Name}</b>
        </label><br />

        <label>
            Employee Id: <b>{employee.Id}</b>
        </label><br />

        <label>
            Employee Location: <b>{employee.Location}</b>
        </label>
        <Department deptName={employee.deptName} Number={employee.Number}></Department>

    </div >;


}
var Department = dept => {
    return <div>
        <label>Dept Name: <b>{dept.deptName}</b></label><br />
        <label>Dept Number: <b>{dept.Number}</b></label>
    </div>;
}
const element = <EmployeeDetails Name="sujatha" Id="101" Location="Bangalore" deptName="Development" Number="201">

</EmployeeDetails>

ReactDOM.render(element, document.getElementById("root"));

//class components

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        // this.props.Name = "suja";
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
                Employee Location: <b>{this.props.Location}</b>
            </label>
            <Department1 DeptName={this.props.DeptName} DeptNumber={this.props.DeptNumber}></Department1>
        </div>;
    }
}

class Department1 extends React.Component {
    render() {

        return <div>
            <label>Dept Name: <b>{this.props.DeptName}</b></label><br />
            <label>Dept Number: <b>{this.props.DeptNumber}</b></label>
        </div>;
    }
}

const employee1 = <EmployeeInfo Name="sujatha" Id="101" Location="Bangalore" DeptName="Development" DeptNumber="201">

</EmployeeInfo>
ReactDOM.render(employee1, document.getElementById('data'));

// state 

class Colors extends React.Component {
    // counter = 0;
    state = { counter: 0 };
    addColor = () => {
        this.setState({ counter: this.state.counter + 1 });
        // this.counter = this.counter + 1;
        // console.log("Adding a new color")
        // console.log(`Adding a color ${this.counter} number of times`)
    }
    render() {
        return <div>
            <h2>New Colors...</h2>
            <button onClick={this.addColor}>New Color</button>
            <label>Add color is clicked: <b>{this.state.counter} times</b></label>
        </div>;
    }
}

const new1 = <Colors></Colors>
ReactDOM.render(new1, document.getElementById('colors'));


class Countchar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }
    onMessageChange(text) {
        this.setState({
            message: `Message has ${text.length} number of characters`
        })
    }
    render() {
        return <div>
            <h2>Count the Characters</h2>
            <label>Enter the Message: <input type="text" onChange={e => this.onMessageChange(e.target.value)}></input>
            </label>
            <label>{this.state.message}</label>
        </div>
    }
}
const messages = <Countchar></Countchar>
ReactDOM.render(messages, document.getElementById('messages'));


