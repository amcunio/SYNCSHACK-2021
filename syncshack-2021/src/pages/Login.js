import { useRef } from "react";
import { useHistory } from "react-router";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Form from "../components/Form";

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

function Login({ location }) {
  const classes = useStyles();
  const formRef = useRef();
  const history = useHistory();
  const isSignup = location.pathname === '/signup';

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.imgBox}></div>
      <div className={classes.formBox}>
        <Form
          formRef={formRef}
          onSubmit={onSubmit}
          isSignup={isSignup}
        />
      </div>
    </Container>
  );
}

export default Login;
