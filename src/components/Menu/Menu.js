import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function MenuDrawer(props) {
  const classes = useStyles();
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={props.open}
          onOpen={props.fOpen}
          onClose={props.fClose}>
          <div className={clsx(classes.list)} role="presentation">
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <InboxIcon /> Home
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button component={Link} to="/Upload">
                <ListItemIcon>
                  <MailIcon /> Upload
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
