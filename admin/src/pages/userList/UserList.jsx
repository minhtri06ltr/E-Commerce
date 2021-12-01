import "./userList.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  getAllUsers,
  deleteUser,
} from "../../redux/apiRequest";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function UserList() {
  const userList = useSelector(
    (state) => state.userList.users,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteUser(dispatch, id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "username",
      headerName: "User",
      width: 90,
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
      width: 230,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 105,
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
  userList.map((user) => {
    user.format = format(user.createdAt);
  });
  return (
    <div className="userList">
      <DataGrid
        rows={userList}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
        components={{
          Toolbar: MyExportButton,
        }}
      />
    </div>
  );
}
