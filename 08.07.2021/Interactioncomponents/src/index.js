import React, { useEffect, useState, createRef, useRef, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import Toggle from './toggle'
import Getstateprops from './derived'
import Childcomponent from './child';
import Usergreet from './user';
import Guestgreet from './guest';
import Newuser from './newforward';
import Newstrict from './newstrict';
import PropTypes from 'prop-types';
import reactToWebComponent from "react-to-webcomponent";
import Uselocalstorage from './localstorage';
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

//Handle array with lists

function Fruits() {
    const data = ["Apple", "mango", "orange"]
    data.map((fruit) => {
        console.log("the Fruits are: ", fruit)
    })
    // for (i = 0; i < data.length; i++) {
    //     console.log("new fruits are: ", data[i])
    // }
    const Details = [
        { name: 'tiger', email: 'abc@gm.com', contact: '111' },
        { name: 'Lion', email: 'abc@gm.com', contact: '111' },
        { name: 'cheetah', email: 'abc@gm.com', contact: '111' },
    ]
    return (
        <div style={{ border: '1px solid black' }}>
            <h1>Handle Array with lists</h1>
            {/* {
                data.map((data) => {
                    <h1>{data}</h1>

                })

            } */}
            <table>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>contact</td>
                </tr>
                {
                    Details.map((item) => {
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                        </tr>
                    })
                }
            </table>
        </div>
    )
}
ReactDOM.render(<Fruits />, document.getElementById('newlist'))

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


// lifecycle of hooks useEffect

function Hooks() {
    const [count1, setCount1] = useState(0)
    useEffect(() => {
        console.log(count1);
        document.title = "count is " + count1;
    }, [count1 >= 3])
    return (
        <div>
            <h1>Use Lifecycle of Hooks in Functions</h1>

            <button onClick={() => { setCount1(count1 + 1) }}>Click</button>
        </div>
    )
}

ReactDOM.render(<Hooks />, document.getElementById('hooks'))


function Hooked() {
    const [counts, setCounts] = useState(0)
    // useEffect(() => {
    //     console.log(counts);
    //     document.title = "count is " + counts;
    // }, [counts >= 2])
    return (
        <div>
            <h1>Use Lifecycle of Hooks in Functions</h1>
            <Childcomponent counts={counts} />
            <button onClick={() => { setCounts(counts + 1) }}>Click++</button>
        </div>
    )
}

ReactDOM.render(<Hooked />, document.getElementById('effect'))


// Conditional rendering

function Greet(props) {
    const Isloogedin = props.Isloogedin;
    if (Isloogedin) {
        return (
            <Usergreet />
        )
    }
    return (<Guestgreet />)
}
ReactDOM.render(<Greet Isloogedin={true} />, document.getElementById("greet"))

/****************************************************************************** */
// Lifting state up

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            address: ''
        }
    }
    orderInfo = val => {
        this.setState({ quantity: val })
    }
    addressChange = val => {
        this.setState({ address: val })
    }

    render() {
        return (
            <div>
                <h1>Product Order!</h1>
                <Product quantity={this.state.quantity} OnquantityChange={this.orderInfo} />
                <Address address={this.state.address} OnAddressChange={this.addressChange} />

                <Summary quantity={this.state.quantity} address={this.state.address} OnquantityChange={this.orderInfo} OnAddressChange={this.addressChange} />
            </div>
        )

    }
}

class Product extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.OnquantityChange(e.target.value);
    }

    render() {
        return (
            <div style={{ border: '1px solid red' }}>
                <h2>Product Information</h2>
                <p>
                    <label>Product Name:
                        <select>
                            <option value="pro1">New product</option>
                            <option value="pro2">New products</option>
                            <option value="pro3">New product1</option>
                        </select>
                    </label>
                </p>
                <p>
                    <label>Enter the Quantity:
                        <input type="text" value={this.props.quantity} onChange={this.handleChange}></input>
                    </label>
                </p>
            </div>
        )

    }
}



class Address extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.OnAddressChange(e.target.value);

    }
    render() {
        return (
            <div style={{ border: '1px solid red' }}>
                <h2>Address Information</h2>
                <p>
                    <label> Address Information
                        <textarea value={this.props.address} onChange={this.handleChange}></textarea>

                    </label>
                </p>
                <Errorboundary>
                    <Existing> </Existing>
                </Errorboundary>
            </div>
        )

    }
}

class Existing extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        // return (
        //     <div style={{ border: '1px solid red' }}>
        //         <h2>Existing Address</h2>
        //         {/* <p>
        //             ABC street,<br></br>
        //             Chennai,
        //         </p> */}
        //     </div>
        // )
        throw new Error("Not able the load address list");
    }
}

class Summary extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.OnquantityChange(e.target.value);
    }
    Placeorder = () => {
        // alert(this.setState.orderInfo.quantity.val)
        alert("Your Order is placed")

    }

    render() {
        return (
            <div style={{ border: '1px solid red' }}>
                <h2>Summary Information</h2>
                <p>
                    <label>Product Name: <b>product1</b></label>

                </p>
                <p>
                    <label>Enter the Quantity:
                        <input type="text" value={this.props.quantity} onChange={this.handleChange}></input>
                    </label>
                </p>
                <p>
                    <label>Address: <b>{this.props.address}</b>

                    </label>
                </p>
                <button onClick={this.Placeorder}>Place Order</button>
            </div>
        )

    }
}

// Error Boundary

class Errorboundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: null
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Problem to load the existing address</h2>
                </div>
            )
        }
        else {
            return this.props.children;
        }

    }

}

ReactDOM.render(<Order />, document.getElementById('order'))

//Refs

class Reference extends React.Component {
    constructor() {
        super();
        this.inputRef = createRef();
    }
    // componentDidMount() {
    //     console.log(this.inputRef.current.value = "101")
    // }
    getval = () => {
        console.log(this.inputRef.current.value);

    }

    render() {
        return (
            <div>
                <h1>Refs in React</h1>
                <input type="text" ref={this.inputRef} />
                <button onClick={this.getval}>check ref</button>
            </div>
        )
    }
}

ReactDOM.render(<Reference />, document.getElementById('refs'))

function Use() {
    let outputRef = useRef(null);
    function controlInput() {
        outputRef.current.value = 'abc';
        outputRef.current.style.color = "red";
        // outputRef.current.style.display = "none";
        outputRef.current.focus();

    }
    return (
        <div style={{ border: '1px solid green' }}>
            <h1>Use ref in react</h1>
            <input type="text" ref={outputRef}></input>
            <button onClick={controlInput}>Handle Input</button>
        </div>
    )
}

ReactDOM.render(<Use />, document.getElementById('refer'))

function Forward() {
    let newref = useRef(null);
    function forwards() {
        console.log(newref.current.value);
    }
    return (
        <div>
            <h1>Forward ref in React</h1>
            <Newuser ref={newref} />
            <button onClick={forwards}>Update Ref</button>
        </div>
    )
}

ReactDOM.render(<Forward />, document.getElementById('for'))

//uncontrolled components

function Newform() {
    let nameRef = useRef(null)
    let passRef = useRef(null)
    function formSubmit(e) {
        e.preventDefault()
        console.log("Name:", nameRef.current.value);
        console.log("Password: ", passRef.current.value);
        let email = document.getElementById("email").value
        console.log("Email: ", email);
    }
    return (
        <div>
            <h1>Uncotrolled components</h1>
            <form onSubmit={formSubmit}>
                <p>
                    <input type="text" ref={nameRef} />
                </p>

                <p>
                    <input type="text" ref={passRef} />
                </p>

                <p>
                    <input type="text" id="email" />
                </p>

                <p>
                    <button>Submit</button>
                </p>

            </form>
        </div>
    )
}
ReactDOM.render(<Newform />, document.getElementById('uncontrol'))

//Higher order function

function Apps() {
    return (
        <div>
            <h1>Higher Order Component</h1>
            <HOC cmp={Counting} />
        </div>
    )

}

function HOC(props) {
    return (
        <div>
            <h1 style={{ backgroundColor: 'red', width: 100 }}>Click!!<props.cmp /></h1>

        </div>
    )
}

function Counting() {
    const [count2, setCount2] = useState(0)
    return (
        <div>

            <h3>{count2}</h3>

            <button onClick={() => { setCount2(count2 + 1) }}>counter</button>
        </div>
    )
}
ReactDOM.render(<Apps />, document.getElementById('counting'))

//portals

class Homeapp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Portals</h1>
                <p>This is simple tag</p>
                <Portalapp />
            </div>

        )
    }
}

function Portalapp() {
    return ReactDOM.createPortal(
        <div>
            <p>this is create portal</p>
        </div>,
        document.getElementById('portal-root')
    )
}

ReactDOM.render(<Homeapp />, document.getElementById('portal-root'))

class Indexs extends React.Component {
    componentWillMount() {
        console.log("user component will mount");
    }
    render() {
        return (
            <div>
                <h1>---Strict Mode---</h1>
                {/* <Newstrict/> */}
            </div>
        )
    }
}

ReactDOM.render(<Indexs />, document.getElementById('usagestrict'))

//React proptypes typechecking
const person = {
    name: 'Bob',
    age: 15
}
class Parentcomponent extends React.Component {
    render() {
        return (
            <div>
                <h1>TypeChecking with prop types</h1>
                <h3><Personcomponent age={18} /></h3>
                {/* <h3><Personcomponent person= {person}/></h3> */}
            </div>
        )
    }
}


const Personcomponent = (props) => {
    return (
        <div>
            {/* <p>{props.person.name} - {props.person.age}</p> */}
            <p>{props.name} - {props.age}</p>
        </div>
    )
}

Personcomponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number
}
Personcomponent.defaultProps = {
    name: "undefined"
}
ReactDOM.render(<Parentcomponent />, document.getElementById('type'))

//Webcomponents
class Webs extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    inc() {
        this.setState(prev => ({
            count: prev.count + 1
        }))
    }

    dec() {
        this.setState(prev => ({
            count: prev.count - 1
        }))
    }

    render() {
        return (
            <div>
                <h1>Web component</h1>
                <button onClick={() => this.inc()}>up</button>
                <button onClick={() => this.dec()}>Down</button>
                <span>{this.state.count}</span>
            </div>
        )
    }
}
customElements.define("my-counter", reactToWebComponent(Webs, React, ReactDOM))
// ReactDOM.render(<Webs/>,document.getElementById('web'))

// Rules of Hooks

function Insideloop() {
    //Inside loop
    for (let i = 0; i < 10; i++) {
        let [count3, setCount3] = React.useState("null");
    }


    //Inside Conditions
    if (true) {
        let [count3, setCount3] = React.useState("null");
    }

    // Nested loops
    const Handler = () => () => {
        const [count3, setCount3] = React.useState("null");

    }
    return <h2>Do not call React hook inside the Conditional and loops</h2>

}

export default Insideloop;

//Only call hooks from React functions

//Regular function will not contain any JSX elements

function regularFunc() {
    const [count] = useCustomHook();
}

//React function return JSX 

function useCustomHook() {
    const [countss, setCountss] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCountss((state) => state + 1);
        }, 1000);
    }, []);
    return countss;
}

const CustomFunction = () => {
    const countss = useCustomHook();

    return (
        <h1>Good Try: {countss}</h1>
    )
}
// export default CustomFunction;

// Custom Hooks

function Newelement() {
    // const [text, setText] = useState(window.localStorage.getItem('text'))
    const [text, setText] = Uselocalstorage('text', '')
    const [times, setTimes] = Uselocalstorage('times', 0)


    // const setLocalStorage = value => {
    //     try {
    //         setText(value)
    //         window.localStorage.setItem("text", value)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const setLocalStorage = Uselocalstorage('text', 'setText')
    return (

        <>
            <h2>Custom Hooks</h2>
            <textarea value={text} placeholder="Enter the text" onChange={e => setText(e.target.value)}>

            </textarea>
            <button onClick={() => setTimes(times + 1)}>Post</button>
            <span>{times}</span>
        </>
    )
}
ReactDOM.render(<Newelement />, document.getElementById('hook'))