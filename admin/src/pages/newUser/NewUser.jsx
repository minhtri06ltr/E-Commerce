import "./newUser.css";

import { useState } from "react";
export default function NewUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
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
      </form>
    </div>
  );
}
