import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import _ from 'lodash';

import { getUser, createUser, updateUser } from '../api/user';
import { COLUMNS, FIRST_NAME, LAST_NAME, EMAIL } from '../constants/user';
import { REQUIRED, INVALID_EMAIL } from '../constants/schema';

const schema = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED),
  lastName: Yup.string().required(REQUIRED),
  email: Yup.string()
    .email(INVALID_EMAIL)
    .required(REQUIRED),
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    width: 90,
  },
}));

function User(props) {
  const [user, setUser] = useState({
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
  });

  const { id } = props.match.params;

  useEffect(() => {
    const fetchUser = async id => {
      try {
        const response = await getUser(id);

        setUser(_.pick(response.data, [FIRST_NAME, LAST_NAME, EMAIL]));
      } catch (err) {
        console.error(err.message);
      }
    };

    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const handleOnSubmit = async (user, { setSubmitting }) => {
    try {
      if (id) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }

      props.history.push('/');
    } catch (err) {
      console.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={schema}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              {COLUMNS.map(({ field, title }) => (
                <Field
                  required
                  fullWidth
                  key={field}
                  name={field}
                  label={title}
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              ))}

              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Button
                  className={classes.button}
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  className={classes.button}
                  disabled={isSubmitting}
                  variant="contained"
                  component={Link}
                  to="/"
                >
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default User;
