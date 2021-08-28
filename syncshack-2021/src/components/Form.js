import { useState, useEffect } from "react";
import { Chip, Typography, Link, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
  },
  form: {
    width: "100%",
  },
  input: {
    borderRadius: '20px',
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
  },
  chip: {
    marginRight: '5px',
  },
  submit: {
    marginTop: '1rem',
    padding: '10px',
    borderRadius: '15px',
    display: 'block',
    width: '200px',
    margin: '0 auto 10px',
  }
}));

const OutlinedInput = (props) => {
  const classes = useStyles();

  return (
    <TextField
      InputProps={{classes: {root: classes.input}}}
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
  const [skill, setSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [wish, setWish] = useState("");
  const [wishList, setWishList] = useState([]);
  const addSkill = e => {
    if (e.key === 'Enter') {
      const newSkill = skill.trim();
      if (newSkill) {
        setSkillList([...skillList, newSkill]);
        setSkill('');
      }
    }
  }
  const addWish = e => {
    if (e.key === 'Enter') {
      const newWish = wish.trim();
      if (newWish) {
        setWishList([...wishList, newWish]);
        setWish('');
      }
    }
  }
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    }
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }
  }, []);

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
          autoFocus
        />
        <OutlinedInput
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="password"
        />
        {isSignup && (
          <>
            <OutlinedInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="password"
            />
            <OutlinedInput
              name="mySkills"
              label="My Skills"
              type="text"
              id="mySkills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={addSkill}
              autoComplete="text"
            />
            {skillList && skillList.length > 0 && (
              skillList.map((el, i) => <Chip className={classes.chip} size='small' variant="outlined" key={i} color="primary" label={el} />)
            )}
            <OutlinedInput
              name="wishList"
              label="I want to practice"
              type="text"
              id="wishList"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              onKeyDown={addWish}
              autoComplete="text"
            />
            {wishList && wishList.length > 0 && 
              wishList.map((el, i) => <Chip className={classes.chip} size='small' variant="outlined" key={i} color="primary" label={el} />)
            }
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {isSignup ? "Sign Up" : "Login In"}
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
