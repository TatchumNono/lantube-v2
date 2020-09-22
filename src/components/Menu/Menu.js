import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Mail';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Utils/LanguageSwitcher'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const MenuDrawer = (props) => {
  const { t } = useTranslation();
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
            <div className="langDrawer">
              {t('language')}: <LanguageSwitcher />
            </div>
            <List>
              <ListItem button component={Link} to="/" onClick={props.fClose}>
                <ListItemIcon>
                  <HomeIcon /> {t('home')}
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button component={Link} to="/Upload" onClick={props.fClose}>
                <ListItemIcon>
                  <FolderIcon /> {t('upload')}
                </ListItemIcon>
                <ListItemText />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default MenuDrawer;
