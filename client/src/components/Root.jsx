import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';

function Root(props) {
  return (
    <>
      <CssBaseline />
      <Router>{props.children}</Router>
    </>
  );
}

export default Root;
