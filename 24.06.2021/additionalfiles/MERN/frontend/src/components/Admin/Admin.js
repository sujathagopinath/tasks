import React, { useEffect, useState } from 'react'
import './Admin.css';
import { manageUsers, updateRole } from '../../redux/actions/users/userActions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../DisplayMessage/ErrorMessage';
import SuccessMessage from '../DisplayMessage/SuccessMessage';


const Admin = ({ history }) => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [role, setRole] = useState(userInfo ? userInfo.role : '');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(manageUsers());
    }, [dispatch, history]);

    const updatedRole = useSelector(state => state.updatedRole);
    const { user, loading, success, error } = updatedRole;
    console.log("adminuser", user)

    useEffect(() => {
        if (userInfo === null) history.push('/login');
    }, [userInfo, history]);

    const formSubmitHandler = e => {
        e.preventDefault();
        dispatch(updateRole(role));
    };
    const usersList = useSelector(state => state.usersList);
    const { users } = usersList;
    console.log("Userlist", users);
    return (
        <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {user && !loading && success && (
                        <SuccessMessage msg='Updated successfully.' />
                    )}
                    {/* {!user && !loading && error && (<ErrorMessage error="Invalid user Id" />)} */}
                    <div className='row'>
                        <div className='col'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Username</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Role</th>
                                        {/* <th scope='col'>Update</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {users &&
                                        users.map(user => {
                                            return (
                                                <tr className='table-dark' key={user._id}>
                                                    <td className='username'>{user.name}</td>
                                                    <td>
                                                        <Link className='nav-link nav' to='/profile'>
                                                            {user.email}
                                                        </Link>
                                                    </td>
                                                    {/* <td>{user.role}</td> */}
                                                    <td>
                                                        <form onSubmit={formSubmitHandler}>
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <select
                                                                value=""
                                                                onChange={e => setRole(e.target.value)}>
                                                                <option value="">Choose any one</option>
                                                                <option value="ADMIN" {...user.role === 'ADMIN' ? 'selected' : ''} >Admin</option>
                                                                <option value="CLIENT" {...user.role === 'CLIENT' ? 'selected' : ''} >Client</option>
                                                            </select>
                                                            <input type="submit" value="update" />
                                                        </form>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
