import React from 'react';
import ReactDOM from 'react-dom';


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                Id: '',
                Name: '',
                Location: ''
            }
        };
    }
    Handler = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            employee: {
                ...this.state.employee,
                [name]: value
            }
        });

    }
    onCreateEmployee = () => {
        console.log(this.state.employee);
    }
    render() {
        return (
            <div className="box">
                <h2>New Employee Form!!</h2>
                <form className="form">

                    <label>
                        Employee Id: <input type="text" name="Id" value={this.state.employee.Id}
                            onChange={this.Handler}></input>

                    </label>

                    <label>
                        Employee Name: <input type="text" name="Name" value={this.state.employee.Name}
                            onChange={this.Handler}></input>
                    </label>




                    <label>
                        Employee Location: <input type="text" name="Location" value={this.state.employee.Location}
                            onChange={this.Handler}></input>
                    </label>
                    <button onClick={this.onCreateEmployee}>Create</button>

                </form>

            </div>
        )


    }
}

ReactDOM.render(<Employee />, document.getElementById('root'));