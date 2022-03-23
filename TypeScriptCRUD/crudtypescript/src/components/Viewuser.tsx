import React from "react";
import { IUser } from "../shared/interface/Adduser";

interface IProps {
  users: IUser[];
  onEdit: (user: IUser) => any;
  onDelete: (user: IUser) => any;
}

const UserTable = (props: IProps) => {
  return (
    <div className="user-table">
      <h1>View users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>profession</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.profession}</td>
                <td>{i.age}</td>

                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no users</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
