import React from 'react'
import { Typography, Link, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  root: {

  }
});

const OutlinedInput = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      variant="outlined"
      margin="normal"
      color="primary"
      required
      fullWidth
      {...props}
    />
  );
}

export default function LoginForm({emailRef, passwordRef, onSubmit}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h5">
        Welcome to <span className={classes.myfront}>My</span>
        <span className={classes.myRecipe}>Recipe</span>!
      </Typography>
      <form className={classes.form} noValidate>
        <OutlinedInput
          inputRef={emailRef}
          id="loginEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <OutlinedInput
          inputRef={passwordRef}
          name="password"
          label="Password"
          type="password"
          id="loginPassword"
          autoComplete="password"
        />
        <Button
          onClick={onSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login In
        </Button>
        <Link component={RouterLink} variant="body2" color="primary" to="/signup" >
          {"Don't have an account? Sign Up Now!"}
        </Link>
      </form>
    </div>
  );
}
