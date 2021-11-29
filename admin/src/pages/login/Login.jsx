import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiRequest";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <input
        style={{
          padding: "10px",
          marginBottom: "10px",
        }}
        type="text"
        placeholder="username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />
      <input
        style={{
          padding: "10px",
          marginBottom: "10px",
        }}
        type="password"
        placeholder="password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <button
        style={{
          padding: "10px",
          width: "100px",
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
