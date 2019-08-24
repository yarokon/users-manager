import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';

import { getUsers, deleteUser } from '../api/user';
import { COLUMNS } from '../constants/user';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  table: {
    marginTop: theme.spacing(4),
  },
}));

function UserList(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        setUsers(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUsers();
  }, []);

  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <MaterialTable
        title="User List"
        className={classes.table}
        columns={COLUMNS}
        data={users}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: () => props.history.push(`/user`),
          },
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, { _id }) => props.history.push(`/user/${_id}`),
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: async (event, { _id }) => {
              try {
                await deleteUser(_id);

                setUsers(users.filter(user => _id !== user._id));
              } catch (err) {
                console.log(err.message);
              }
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </Container>
  );
}

export default UserList;
