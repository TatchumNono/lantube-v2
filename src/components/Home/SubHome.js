import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import ButtonBase from '@material-ui/core/ButtonBase';
//import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function SubHome() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    document.title = `LanTube`;
    setLoading(true);
    axios
      .get('http://localhost:4000/file/')
      .then((res) => {
        setLoading(false);
        setContent(res.data.file);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const Media = () => {
    return (
      <Grid container wrap="wrap" spacing={5}>
        {content.map((item) => (
          <Box key={item._id} width={300} marginRight={1} my={5}>
            <div className={classes.root1}>
              <ButtonBase
                focusRipple
                key={item._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{ width: 320, height: 240 }}
                component={Link}
                to={`/Player/${item._id}`}>
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                  }}
                />

                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}>
                    Play
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </div>
            <Box pr={2}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                display="block"
                variant="caption"
                color="textSecondary">
                {`${item.username} •    ${item.category}`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
    );
  };

  const MediaLoading = () => {
    return (
      <Grid container wrap="nowrap">
        {Array.from(new Array(count)).map((index) => (
          <Box key={index} width={210} marginRight={0.5} my={5}>
            <Skeleton variant="rect" width={210} height={118} />
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        ))}
      </Grid>
    );
  };

  return (
    <Box overflow="hidden">
      <Container className={classes.root}>
        {loading ? <MediaLoading /> : <Media />}
      </Container>
    </Box>
  );
}
