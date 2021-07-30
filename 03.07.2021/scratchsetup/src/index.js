import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Functional Components

function Index(props) {
    return (
        <div>
            <h1>Hello,{props.Name}</h1>
        </div>
    )
}
const elemt = <Index Name="New Functional component"></Index>
ReactDOM.render(elemt, document.getElementById("text"))

//Parent to child components
function ParentComponent() {
    let [counter, setCounter] = useState(0);
    let increment = () => {
        setCounter(counter + 1);
    }
    return (
        <div>
            <p>Parent to Child </p>
            <button onClick={increment}>Increment Counter</button>
            <Childcomponent counterValue={counter} />
        </div>
    )
}

function Childcomponent(props) {
    return (
        <div>
            <p>value Of Counter{props.counterValue}</p>
        </div>
    )
}

ReactDOM.render(<ParentComponent />, document.getElementById("parenttochild"))


class StudentInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h2>Hello, {this.props.Name}</h2>
            </div>
        )
    }
}

const ele = <StudentInfo Name="New class component"></StudentInfo>
ReactDOM.render(ele, document.getElementById("students"));




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
        React.createElement('h1', null, new Date().toLocaleTimeString())
    )

    ReactDOM.render(form, document.getElementById('form'))
}
setInterval(update, 1000);


//components

// var EmployeeDetails = employee => {
class Employee extends React.Component {
    render() {
        return <div>
            <h1>Employee Details</h1>

            <label>
                {/* Employee Name: <b>{employee.Name}</b> */}
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
}
var Department = dept => {
    return <div>
        <label>Dept Name: <b>{dept.deptName}</b></label>
        <label>Dept Number: <b>{dept.Number}</b></label>
    </div>;
}
const element = <EmployeeDetails Name="sujatha" Id="101" Location="Bangalore" deptName="Development" Number="201">

</EmployeeDetails>

ReactDOM.render(element, document.getElementById("root"));

//Re rendering
class Parent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messagedisplayed: false
        }
    }
    componentDidMount() {
        this.setState({ messagedisplayed: true });
    }
    render() {
        return (
            <Message />
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super();
        this.state = {
            message: "Hello"
        }
    }
    shouldComponentUpdate() {
        console.log("Does not get rendered");
        return false;
    }
    render() {
        console.log("Message is getting rendered");
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

ReactDOM.render(<Parent />, document.getElementById("rerender"));


