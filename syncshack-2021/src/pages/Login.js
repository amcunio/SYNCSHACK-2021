import { useRef } from "react";
import { useHistory } from "react-router";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Form from "../components/Form";
import StoryBoard from "../components/StoryBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingTop: "15%",
    paddingBottom: "15%",
    height: "100%",
    background: "linear-gradient(300deg, #90b49aa1, #56b3aa)",
  },
  overlay: {
    height: "100%",
    width: "800px",
    padding: '0 40px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: '0 auto',
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '10px',
    borderWidth: "1px 0 0 1px",
    border: 'solid rgba(255,255,255, 0.4)',
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
  },
}));

function Login({ location }) {
  const classes = useStyles();
  const formRef = useRef();
  const history = useHistory();
  const isSignup = location.pathname === "/signup";

  const onSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.overlay}>
        <div className={classes.imgBox}>
          <StoryBoard />
        </div>
        <div className={classes.formBox}>
          <Form formRef={formRef} onSubmit={onSubmit} isSignup={isSignup} />
        </div>
      </div>
    </Container>
  );
}

export default Login;
