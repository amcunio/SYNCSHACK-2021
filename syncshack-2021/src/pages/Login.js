import { useRef } from "react";
import { useHistory } from "react-router";
import LoginForm from "../components/LoginForm";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const onSubmit = () => {
    setTimeout(() => {history.push('/dashboard')}, 1000);
  }

  return (
    <div>
      <LoginForm emailRef={emailRef} passwordRef={passwordRef} onSubmit={onSubmit} />
    </div>
  );
}

export default Login;
