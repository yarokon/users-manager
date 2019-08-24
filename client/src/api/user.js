import axios from 'axios';

const USER_ROUTE = '/api/users';

export const getUsers = (params = {}) => axios.get(USER_ROUTE, params);

export const getUser = id => axios.get(`${USER_ROUTE}/${id}`);

export const createUser = user => axios.post(USER_ROUTE, user);

export const updateUser = (id, user) => axios.put(`${USER_ROUTE}/${id}`, user);

export const deleteUser = id => axios.delete(`${USER_ROUTE}/${id}`);
