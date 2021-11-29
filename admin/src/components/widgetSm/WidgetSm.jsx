import "./widgetSm.css";
import { useEffect,useState } from "react";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../helper/requestMethods";
export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await userRequest.get(
          "users/?new=true",
        );
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">
        New User Members
      </span>
      <ul className="widgetSmList">
        {users.map((user, index) => (
          <li
            key={index}
            className="widgetSmListItem"
          >
            <img
              src={
                user.img ||
                "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span
                style={{ textAlign: "center" }}
                className="widgetSmUsername"
              >
                {user.username}
              </span>
              <span
                style={{ textAlign: "center" }}
                className="widgetSmUserTitle"
              >
                {user.email}
              </span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
