import React, { useState } from "react";
import { IBaseUser, IUser } from "./shared/interface/Adduser";
import { Greet } from "./components/Addusers";
import UserTable from "./components/Viewuser";
import EditUserForm from "./components/Edituser";
function App() {
  const defaultUsers: IUser[] = [];
  // = [
  // { name: "lily hh",  profession: "lily", id: 1, age: 18 },
  // {  name: "bob haha",profession: "bob", id: 2, age: 19 }
  // ];
  const initCurrentUser: IUser = {
    profession: "",
    name: "",
    age: "",
    id: 1,
  };
  const [users, setUsers] = useState(defaultUsers);
  const [editUser, setEditUser] = useState(initCurrentUser);
  const [edit, setEdit] = useState(false);

  const Adduser = (newUser: IBaseUser) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
    console.log([users]);
  };
  const CurrentUser = (user: IUser) => {
    setEditUser(user);
    setEdit(true);
  };
  const UpdateUser = (id: number, newUser: IUser) => {
    setEdit(false);
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };
  const DeleteUser = (currentUser: IUser) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };
  return (
    <div className="App">
      <h3>CRUD Application</h3>
      <UserTable users={users} onEdit={CurrentUser} onDelete={DeleteUser} />
      {edit ? (
        <EditUserForm
          user={editUser}
          UpdateUser={UpdateUser}
          setEdit={setEdit}
        />
      ) : (
        <Greet Adduser={Adduser} />
      )}
    </div>
  );
}

export default App;
