import React, { useState } from "react";
import { IBaseUser } from "../shared/interface/Adduser";
import "../assets/style.css";
import axios from "axios";
import { connect } from "react-redux";
import userReducer from "../store/reducers/userReducer";

interface AddProps {
  Adduser: (user: IBaseUser) => any;
}
const initUser = { name: "", profession: "", age: "" };
export const Greet = (props: AddProps) => {
  const [formValue, setFormValue] = useState(initUser);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.Adduser(formValue);
    axios
      .post(`http://localhost:5000/user`, formValue)
      .then((data) => [console.log(data)]);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>add users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Profession</label>
          <input
            type="text"
            placeholder="please input profession"
            name="profession"
            value={formValue.profession}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Age</label>
          <input
            type="number"
            placeholder="please input age"
            name="age"
            value={formValue.age}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <button>Add new user</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  userData: state.formValue,
});

export default connect(mapStateToProps, userReducer)(Greet);
