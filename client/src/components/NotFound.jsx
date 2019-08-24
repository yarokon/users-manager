import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          404: Page Not Found
        </Typography>

        <br />

        <Grid container justify="center">
          <Button
            className={classes.button}
            variant="contained"
            component={Link}
            to="/"
          >
            home page
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

export default NotFound;
