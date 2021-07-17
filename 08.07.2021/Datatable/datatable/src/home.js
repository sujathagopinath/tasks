import React from 'react';
import ReactDOM from 'react-dom';
import { EmployeeConsumer } from './context';
// import { Table, Button } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Crud Operation</h3>
                <EmployeeConsumer>
                    {
                        (value) => {
                            return (
                                <Table striped bordered hover variant="dark">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Age</th>
                                            <th>Start Date</th>
                                            <th>Salary</th>
                                            <th>Actions</th>
                                        </tr>

                                        <tr>
                                            <td><input type="text" value={value.Name} onChange={(e) => { value.updateValue(e, "Name") }} /></td>
                                            <td><input type="text" value={value.Position} onChange={(e) => { value.updateValue(e, "Position") }} /></td>
                                            <td><input type="text" value={value.Office} onChange={(e) => { value.updateValue(e, "Office") }} /></td>
                                            <td><input type="text" value={value.Age} onChange={(e) => { value.updateValue(e, "Age") }} /></td>
                                            <td><input type="text" value={value.Startdate} onChange={(e) => { value.updateValue(e, "Startdate") }} /></td>
                                            <td><input type="text" value={value.Salary} onChange={(e) => { value.updateValue(e, "Salary") }} /></td>
                                            <td><Button variant="primary" onClick={() => { value.onSave(value.id) }}>{value.id ? "Save" : "Add"}</Button></td>
                                        </tr>

                                        {value.Alldata.map((employee) => {
                                            return (
                                                <tr>
                                                    <td>{employee.Name}</td>
                                                    <td>{employee.Position}</td>
                                                    <td>{employee.Office}</td>
                                                    <td>{employee.Age}</td>
                                                    <td>{employee.Startdate}</td>
                                                    <td>{employee.Salary}</td>
                                                    <td><Button size="sm" variant="primary" onClick={() => { value.onEdit(employee.id) }}>Edit</Button><br />
                                                        <Button size="sm" variant="danger" onClick={() => { value.onDelete(employee.id) }}>Delete</Button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            )
                        }
                    }
                </EmployeeConsumer>
            </div>
        )
    }
}
// ReactDOM.render(<Home />, document.getElementById('app'));

export default Home