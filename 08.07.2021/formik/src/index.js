import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';

const validateEmp = empdata => {
    const errors = {};

    if (!empdata.Id) {
        errors.Id = "Id is required"
    }

    if (!empdata.Name) {
        errors.Name = "Name is required"
    }
    else if (empdata.Name.length > 20) {
        errors.Name = "Name should not more than 10 characters"
    }
    if (!empdata.Location) {
        errors.Location = "Location is required"
    }
    if (!empdata.Email) {
        errors.Email = "Email is required"
    }
    else if (/^[A-Z a-z 0-9]+@[A-Z a-z 0-9]+\.[A-Z a-z]{2,4}$/i.test(empdata.Email)) {
        errors.Email = "Invalid email address"
    }
    return errors;
}

const User = () => {
    const formik = useFormik({
        initialValues: {
            Id: '',
            Name: '',
            Location: '',
            Email: ''
        },
        validate: validateEmp,
        onSubmit: values => {
            // alert(JSON.stringify(values))
            console.log("Employee details", values)
        }
    })
    return (
        <div className="box">
            <h2>New Data form</h2>
            <form onSubmit={formik.handleSubmit} className="form">
                <p>
                    <label> Employee Id:
                        <input type="text" name="Id" value={formik.values.Id}
                            onChange={formik.handleChange}></input>
                        {formik.touched.Id && formik.errors.Id ? <span>{formik.errors.Id}</span> : null}
                    </label>
                </p>

                <p>
                    <label> Employee Name:
                        <input type="text" name="Name" value={formik.values.Name}
                            onChange={formik.handleChange}></input>
                        {formik.touched.Name && formik.errors.Name ? <span>{formik.errors.Name}</span> : null}
                    </label>
                </p>

                <p>
                    <label> Location:
                        <input type="text" name="Location" value={formik.values.Location}
                            onChange={formik.handleChange}></input>
                        {formik.touched.Location && formik.errors.Location ? <span>{formik.errors.Location}</span> : null}
                    </label>
                </p>

                <p>
                    <label> EmailId:
                        <input type="text" name="Email" value={formik.values.Email}
                            onChange={formik.handleChange}></input>
                        {formik.touched.Email && formik.errors.Email ? <span>{formik.errors.Email}</span> : null}
                    </label>
                </p>

                <button type="submit">Create</button>

            </form>
        </div>
    )
}
ReactDOM.render(<User />, document.getElementById('app'))