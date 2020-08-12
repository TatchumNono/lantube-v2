import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dropzone from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';

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
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState([]);
  const { cookies } = useContext(UserContext);
  const [token, setToken] = useState('');
  const [comment, setComment] = useState('Click here select a file!');

  const onDrop = (file) => {
    console.log(file);
    setFile(file[0]);
    setTitle(file[0].name);
    setComment(file[0].name);
    setToken(cookies.userData.token);
  };

  const fileUpload = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('username', cookies.userData.user[0].username);
    fileData.append('title', title);
    fileData.append('category', category);
    fileData.append('file', file);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post('http://localhost:4000/file/upload', fileData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
              <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      width: '100%',
                      height: '240px',
                      border: '1px solid lightgray',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f2f2f2',
                    }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    {comment}
                  </div>
                )}
              </Dropzone>
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
                variant="contained"
                color="primary"
                className={classes.submit}>
                Upload
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
