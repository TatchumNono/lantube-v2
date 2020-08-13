import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import logo from './success2.gif';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(4, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backdropFilter: 'blue',
  },
  root: {
    width: '100%',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function TransModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xs">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.fOpen}
          onClose={props.fClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={props.fOpen}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Uploading... {props.title}</h2>
              <div className={classes.root}>
                {props.progressValue === 100 ? (
                  <img
                    src={logo}
                    alt="haha"
                    style={{ width: '2%', height: '2%' }}
                  />
                ) : (
                  <LinearProgressWithLabel value={props.progressValue} />
                )}
              </div>
            </div>
          </Fade>
        </Modal>
      </Container>
    </div>
  );
}
