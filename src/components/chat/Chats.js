import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import io from 'socket.io-client';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './style.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1500,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Chats() {
  const classes = useStyles();
  //endpoint of the chat socket.io backend
  const CHATENDPOINT = 'localhost:4000';

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);

  const { cookies } = useContext(UserContext);

  let username = cookies.userData.user[0].username;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevState) => (prevState ? false : true));
    console.log('popprer');
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/users')
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
    const socket = io(CHATENDPOINT);
    socket.on('connect', () => {
      console.log(`${username} is connected`);
    });
    socket.emit('join', { username });
  }, [CHATENDPOINT, username]);

  return (
    <div>
      <Popper open={open} anchorEl={anchorEl} placement="top" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="container clearfix">
              <div className="people-list">
                <ul>
                  {users.map((user) => (
                    <li className="clearfix">
                      <img src={user.profileImage} alt="avatar" />
                      <div className="about">
                        <div className="name">{user.username}</div>
                        <div className="status">
                          <i class="fa fa-circle online"></i> online
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat">
                <p>chats here</p>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClick}>
        <ChatIcon />
      </Fab>
    </div>
  );
}
