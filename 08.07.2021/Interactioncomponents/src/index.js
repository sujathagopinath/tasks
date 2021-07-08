import React from 'react';
import ReactDOM, { render } from 'react-dom';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedsalary: null
        };

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
        let salary = parseInt(this.inputrefs.basic.value) + parseInt(this.inputrefs.hra.value) + parseInt(this.inputrefs.SpecialAllowances.value);
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


//Component communication
const employeeContext = React.createContext();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 101,
            Name: 'suja',
            Location: 'Bangalore',
            Salary: 15000
        }
    }
    update = () => {
        this.setState({ Id: 102 });
    }
    render() {
        return <div>
            <h2>New App Component</h2>
            <label>Employee Id: <b>{this.state.Id}</b></label>
            <employeeContext.Provider value={this.state}>
                <EmployeeDetails></EmployeeDetails>
            </employeeContext.Provider>
            <button onClick={this.update}>Update</button>
        </div>;
    }
}

class EmployeeDetails extends React.Component {
    static contextType = employeeContext;

    render() {
        return <div>
            <h2>New Employee Component</h2>
            <label>Employee Id: <b>{this.context.Id}</b></label>
            <SalaryInfo></SalaryInfo>
        </div>
    }
}


class SalaryInfo extends React.Component {
    static contextType = employeeContext;



    render() {
        return <div>
            <h2>New App Component</h2>
            <label>Employee Id: <b>{this.context.Id}</b></label>
        </div>
    }
}

const element1 = <App></App>

ReactDOM.render(element1, document.getElementById('app'));

//Iterating lists
function Employers(props) {
    return <div style={{ border: "3px solid red" }}>
        <label>
            Employee Id: <b>{props.data.Id}</b>
        </label>

        <label>
            Employee Name: <b>{props.data.Name}</b>
        </label>

        <label>
            Employee Location: <b>{props.data.Location}</b>
        </label>

    </div>
}

function DisplayEmployee(props) {
    const empList = props.employeeList;

    const ListElements = empList.map((emp) =>
        <Employers key={emp.Id} data={emp}></Employers>
    );
    return (
        <div>
            {ListElements}
        </div>
    )

}

const employers = [
    { Id: 101, Name: "AAA", Location: "Bangalore", Salary: 12345 },
    { Id: 102, Name: "BBB", Location: "Chennai", Salary: 1234 },
    { Id: 103, Name: "CCC", Location: "Hyderabad", Salary: 123 }

];

const element2 = <DisplayEmployee employeeList={employers}></DisplayEmployee>

ReactDOM.render(element2, document.getElementById('root'));

//handling events

function Loginevent() {
    function handleclick() {
        console.log("Its working");
    }

    return <div>
        <button onClick={handleclick}>Login</button>
    </div>
}

ReactDOM.render(<Loginevent />, document.getElementById('handle'));

//handling event using class

class Handling extends React.Component {
    constructor(props) {
        super()
        // this.newClick = this.newClick.bind(this);

    }
    handleClick = (e) => {
        alert("clicked");
        console.log(e);

    }
    newClick = () => {
        console.log("class method is working");
        console.log(this);
    }


    render() {
        return <div>
            <button onClick={this.handleClick}>Click me</button>
            {/* <button onClick={this.newClick.bind(this)}>New button</button> */}
            <button onClick={this.newClick}>New button</button>

        </div>
    }
}
ReactDOM.render(<Handling />, document.getElementById('handler'));

//usestate in hooks

function Counter() {
    const state = useState(123);
    console.log(state);
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>you clicked {count} times</p>
            < button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div >
    );
}
ReactDOM.render(<Counter />, document.getElementById('handlers'));

const Adddelete = () => {
    const [button, setButton] = useState("");
    const onAdd = () => {
        setButton("Add");
        console.log({ button });
    }

    const onDelete = () => {
        setButton("Delete");
        console.log({ button });
    }



    return (
        <div>
            <button onClick={() => onAdd()}>Add</button>
            <button onClick={() => onDelete()}>Delete</button>


        </div>
    )
}

ReactDOM.render(<Adddelete />, document.getElementById('button'));





