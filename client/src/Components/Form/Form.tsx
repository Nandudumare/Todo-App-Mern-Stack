import axios from "axios";
import React from "react";
// import { useNavigate } from "react-router-dom";
import * as Components from "./Components";
import "./styles.css";

type CreateData = {
  id: Number;
  name: String;
  email: String;
  password: String;
};

type props = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function Form({ setState, loading, setLoading }: props) {
  const [signIn, toggle] = React.useState<boolean>(true);
  const [createData, setCreateData] = React.useState<CreateData | object>({});
  const [loginData, setLoginData] = React.useState<CreateData | object>({});
  // const navigate = useNavigate();

  const handleCreateChange = (e: any) => {
    const name = e.target.name;
    setCreateData({
      ...createData,
      [name]: e.target.value,
    });
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://todo-app-c9s2.onrender.com/user/signup",
        createData
      );
      localStorage.setItem("apiKey", JSON.stringify(res.data.apiKey));
      console.log(res.data);

      setState(true);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Something went wrong");
      }, 2000);
    }
  };

  const handleLoginChange = (e: any) => {
    const name = e.target.name;
    setLoginData({
      ...loginData,
      [name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://todo-app-c9s2.onrender.com/user/login",
        loginData
      );
      localStorage.setItem("apiKey", JSON.stringify(res.data.apiKey));
      console.log(res.data);
      setState(true);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Invalid Email or Password");
      }, 2000);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleCreateSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleCreateChange}
            required
          />
          <Components.Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleCreateChange}
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleCreateChange}
            required
          />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleLoginChange}
            required
          />
          <Components.Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleLoginChange}
            required
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Form;
