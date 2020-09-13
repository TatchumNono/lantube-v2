import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    position: 'absolute',
    zIndex: 1,
    float: 'inherit',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResult] = useState([]);
  const classes = useStyles();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    query === ''
      ? console.log('No query entered')
      : axios
          .post(`http://localhost:4000/file/search?query=${query}`)
          .then((res) => {
            setResult(res.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
  }, [query]);

  console.log(results);

  const ResultDisplay = () => {
    return (
      <div>
        {!results
          ? null
          : results.map((result) => (
              <div key={result._id}>
                <Button
                  key={result._id}
                  component={Link}
                  to={`/Player/${result._id}`}>
                  <div key={result._id}>
                    <p key={result._id}>{result.title}</p>
                  </div>
                </Button>
                <br />
                <Divider />
              </div>
            ))}
      </div>
    );
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          name="query"
          placeholder="Search…"
          onChange={handleQueryChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <Paper className={classes.grow}>
          <ResultDisplay />
        </Paper>
      </div>
    </div>
  );
};

export default Search;
