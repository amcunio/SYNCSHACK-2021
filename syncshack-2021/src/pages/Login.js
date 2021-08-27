import { useRef } from "react";
import { useHistory } from "react-router";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formBox: {
    width: "50%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgBox: {
    width: "50%",
    height: "100%",
    position: "relative",
    zIndex: "-1"
  }
}));

function Login() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.formBox}>
        <LoginForm
          emailRef={emailRef}
          passwordRef={passwordRef}
          onSubmit={onSubmit}
        />
      </div>
    </Container>
  );
}

export default Login;
