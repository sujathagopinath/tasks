import React, { useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
};

export const Users = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let resUsers: User[] = response.data.map((resUser: any) => {
          return {
            id: resUser.id,
            name: resUser.name,
          };
        });
        setUsers(resUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <header>
        <p>Users Data</p>
        <button onClick={() => getData()}>Get Data</button>
        <ul>
          {users?.map((user: User) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      </header>
    </div>
  );
};
