import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { getAllUsers } from "../../redux/apiRequest";
export default function UserList() {
  const [data, setData] = useState(userRows);
  const userList = useSelector(
    (state) => state.userList.users,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    setData(
      data.filter((item) => item.id !== id),
    );
  };
  console.log(userList);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img
              className="userListImg"
              src={params.row.avatar}
              alt=""
            /> */}
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() =>
                handleDelete(params.row._id)
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={userList}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
