import React, { useEffect } from "react";
import "../../assests/ind.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/Actions/Users/useraction";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, history]);

  const usersList = useSelector((state) => state.usersList);
  console.log("userlist:", usersList);
  const { loading, users } = usersList;

  const renderTable = () => {
    if (users) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">UserName</th>
              <th scope="col">UserEmail</th>
            </tr>
          </thead>
          <tbody>
            {users.recordset.map((user) => {
              return (
                <tr className="table-dark" key={user.userId}>
                  <th scope="row">{user.userName}</th>
                  <th scope="row">{user.userEmail}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          {loading ? (
            <Loading />
          ) : (
            <div className="card m-auto " style={{ height: "40px" }}>
              <h3 className="card-title">List of Users </h3>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">{renderTable()}</div>
      </div>
    </div>
  );
};

export default Users;
