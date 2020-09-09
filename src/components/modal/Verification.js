import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  let history = useHistory();
  return (
    <div>
      <Paper style={modalStyle} className={classes.paper}>
        <p>
          It appears you are not logged in please loggin first or create an
          account
        </p>
        <div className={classes.root}>
          <Button
            onClick={() => {
              history.push('/');
            }}
            variant="outlined"
            color="primary">
            Home
          </Button>
          <Button
            onClick={() => {
              history.push('/SignIn');
            }}
            variant="outlined">
            SignIn
          </Button>
          <Button
            onClick={() => {
              history.push('/SignUp');
            }}
            variant="outlined"
            color="secondary">
            Sign Up
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default SimpleModal;
