import "./newUser.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import validator from "validator";
import { addUser } from "../../redux/apiRequest";
export default function NewUser() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");
  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    } else {
      addUser(dispatch, {
        email,
        username,
        password,
      });
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="Usernmae"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button
          onClick={handleClick}
          className="newUserButton"
        >
          Create
        </button>
        <span
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </span>
      </form>
    </div>
  );
}
