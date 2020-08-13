import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../contexts/userContext';
import { useHistory } from 'react-router-dom';
import TransModal from './Progress';
import axios from 'axios';
import './style.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backdropFilter: 'grey',
    flexGrow: 1,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 100,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SubUpload() {
  const classes = useStyles();
  const history = useHistory();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState([]);
  const { cookies } = useContext(UserContext);
  const [token, setToken] = useState('');
  const [buttonS, setButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState('Click here select a file!');
  const [openProgressModal, setOpenProgressModal] = useState(false);

  const handleProgressModalClose = () => {
    setOpenProgressModal(false);
  };

  const onDrop = (e) => {
    setFile(e.target.files[0]);
    setTitle(e.target.files[0].name);
    setComment(e.target.files[0].name);
    setToken(cookies.userData.token);
  };

  if (progress === 100) {
    console.log('Uploaded');
  }

  const fileUpload = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('username', cookies.userData.user[0].username);
    fileData.append('title', title);
    fileData.append('category', category);
    fileData.append('file', file);

    if (title && category === '') {
      setButton(false);
    } else {
      setButton(true);
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: fileData,
        url: 'http://localhost:4000/file/upload',
        onUploadProgress: (progressEvent) => {
          let upload = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(upload);
          setOpenProgressModal(true);
        },
      })
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            handleProgressModalClose();
            setTitle('');
            setCategory('');
            setFile([]);
            history.push('/');
          }, 2000);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Upload
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <form onSubmit={fileUpload} className={classes.form} noValidate>
              <div className="upload-container">
                <input
                  type="file"
                  id="file-browser-input"
                  name="file"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onChange={onDrop}
                  required
                />
                <div className="helper-text">{comment}</div>
              </div>
              <br />
              <TextField
                //id="standard-basic"
                variant="outlined"
                label="Title"
                margin="normal"
                required
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  label="Category">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Film">Film</MenuItem>
                  <MenuItem value="Music">Music</MenuItem>
                  <MenuItem value="Tutorial">Tutorial</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                disabled={buttonS}
                variant="contained"
                color="primary"
                className={classes.submit}>
                Upload
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
      <TransModal
        fOpen={openProgressModal}
        fClose={handleProgressModalClose}
        progressValue={progress}
        title={title}
      />
    </Container>
  );
}
