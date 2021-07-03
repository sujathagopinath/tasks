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