import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import Toggle from './toggle'
import Getstateprops from './derived'
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




//Lifecycle

//mounting , updating , Unmounting


class LifeCycle extends React.Component {
    constructor() {
        super()
        console.log("this is a inital state");
        this.state = {
            show: true

        }
    }
    componentDidMount() {
        console.log("componentdidmount:", "after updation");
    }
    // Show = () => {
    //     this.setState = {
    //         show: !this.state.show
    //     }
    // }


    render() {
        console.log("render:", "This render method after updation")
        return <div>
            <h1>Life Cycle</h1>
            {
                this.state.show ? <Toggle /> : null
            }

            <button onClick={() => { this.setState({ show: !this.state.show }) }}> new update</button>
            {/* <button onClick={this.Show}>Hello</button> */}
        </div>
    }
}

ReactDOM.render(<LifeCycle />, document.getElementById('toggle'));

//component willmount and didmount

class Mount extends React.Component {
    constructor() {
        super();
        console.log("Intializing");
        this.state = {
            data: false
        }

    }
    componentDidMount() {
        console.log("Updation:", "component did mount")
        this.setState({
            data: true
        })
    }
    render() {
        console.log("render:", "render method");
        return <div>
            <h1>Component will unMount </h1>


        </div>
    }
}

//Will unmount

class Unmount extends React.Component {
    constructor() {
        super();
        this.state = {
            show1: false
        }
    }
    render() {
        return (<div>
            <h1>Component will Unmount</h1>
            {
                this.state.show1 ? <Child /> : null
            }
            <button onClick={() => { this.setState({ show1: !this.state.show1 }) }}>Unmount</button>
        </div>)
    }
}


class Child extends React.Component {
    componentWillUnmount() {
        console.log("Unmount:", "The component is hidden");
    }

    render() {
        return (
            <div>
                <h2>Child component</h2>
            </div>
        )
    }
}

ReactDOM.render(< Unmount />, document.getElementById('unmount'));

//update state

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            counter1: 0
        }
    }
    componentDidUpdate(pp, ps, ss) {        //pp=> previous props => used in parent and child, ps=> previous state ss=> snapshot
        console.warn("DidUpdate:", "method is updated", ps)
        // if (ps.counter1 == this.state.counter1) {
        if (ps.counter1 < 3) {
            console.log("match")
        }
        else {
            console.log("Did not match")
        }
    }
    render() {
        return (<div>
            <h1>Component update  state method</h1>
            <button onClick={() => { this.setState({ counter1: this.state.counter1 + 1 }) }}>Update Counter{this.state.counter1}</button>
        </div >
        )

    }
}
ReactDOM.render(<Update />, document.getElementById('update'))

//previous state component

class Newupdate extends React.Component {
    constructor() {
        super();
        this.state = {
            counter2: 0
        }
    }

    render() {
        return (<div>
            <h1>Component update props method</h1>
            <Childs newdata={this.state.counter2} />
            <button onClick={() => { this.setState({ counter2: this.state.counter2 + 1 }) }}>Update Counters{this.state.counter2}</button>
        </div >
        )

    }
}

class Childs extends React.Component {
    constructor() {
        super();
        this.state = {
            counter2: 0
        }
    }
    componentDidUpdate(pP, pS, sS) {
        console.log("Method is called previous props:", pP, this.props.newdata);
    }


    render() {
        return (<div>
            <h1>New child {this.props.newdata}</h1>

        </div >
        )

    }
}

ReactDOM.render(<Newupdate />, document.getElementById('updates'))

//getDerivedstatefromprops

class Derivedstate extends React.Component {
    constructor() {
        super();
        this.state = {
            inc: 0
        }
    }
    render() {
        return (<div>
            <h1>Get Dervied state from Props {this.state.inc}</h1>
            <Getstateprops inc={this.state.inc} />
            <button onClick={() => { this.setState({ inc: this.state.inc + 1 }) }}>Make ++</button>


        </div >)
    }
}

ReactDOM.render(<Derivedstate />, document.getElementById('derivedstate'))



