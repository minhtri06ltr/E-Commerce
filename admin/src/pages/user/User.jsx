import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  LockOpenOutlined,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {
  Link,
  useLocation,
} from "react-router-dom";
import validator from "validator";
import "./user.css";
import { format } from "timeago.js";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiRequest";
export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.userList.users.find(
      (user) => user._id === userId,
    ),
  );
  const [username, setUsername] = useState(
    user.username,
  );

  console.log(username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    }
    if (password === "") {
      updateUser(
        dispatch,
        { username, email },
        user._id,
      );
    } else {
      updateUser(
        dispatch,
        { username, password, email },
        user._id,
      );
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">
            Create
          </button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            {/* <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            /> */}
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {user.username}
              </span>
              <span className="userShowUserTitle">
                Customer
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">
              Account Details
            </span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user._id}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {format(user.createdAt)}
              </span>
            </div>
            <span className="userShowTitle">
              Contact Details
            </span>
            {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div> */}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.email}
              </span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}

            <div className="userShowInfo">
              <LockOpenOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.password}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">
            Edit
          </span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="userUpdateInput"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="userUpdateInput"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Password"
                  className="userUpdateInput"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button
                onClick={handleClick}
                className="userUpdateButton"
              >
                Update
              </button>
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {errorMessage}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
