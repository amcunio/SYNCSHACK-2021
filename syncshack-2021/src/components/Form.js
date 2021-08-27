import React from "react";
import { Typography, Link, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
  },
  form: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
  },
}));

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
};

export default function Form({ formRef, onSubmit, isSignup }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.title}>
        {isSignup ? "Welcome" : "Welcome Back"}
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <OutlinedInput
          id="loginEmail"
          label="Email Address"
          name="email"
          autoComplete="email"
          required
          autoFocus
        />
        <OutlinedInput
          name="password"
          label="Password"
          type="password"
          id="loginPassword"
          required
          autoComplete="password"
        />
        {isSignup && (
          <OutlinedInput
            name="password"
            label="Confirm Password"
            type="password"
            id="loginPassword"
            required
            autoComplete="password"
          />
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {isSignup ? "Sign Up": "Login In"}
        </Button>
        <Link
          component={RouterLink}
          variant="body2"
          color="primary"
          to={isSignup ? "/" : "/signup"}
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Don't have an account? Sign Up Now!"}
        </Link>
      </form>
    </div>
  );
}
