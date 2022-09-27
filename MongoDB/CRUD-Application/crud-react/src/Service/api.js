import axios from 'axios';

const usersUrl = 'http://localhost:8080/users';

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteUser = async (id, user) => {
  console.log("deleteid", id);
  return await axios.delete(`${usersUrl}/${id}`, user);
};

export const editUser = async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}