import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import error from './error.svg';

const useStyles = makeStyles(() => ({
  root: {
    top: 0,
    left: 0,
    textAlign: 'center',
    position: 'absolute',
    alignContent: 'center',
    paddingLeft: '28%',
    paddingTop: '10%',
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={error} alt="error icon" />
      <h3>PAGE NOT FOUND</h3>
    </div>
  );
}

export default NotFound;
