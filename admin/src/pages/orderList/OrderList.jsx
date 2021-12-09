import "./orderList.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {Link} from 'react-router-dom'
import { getAllOrders } from "../../redux/apiRequest";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function OrderList() {
  const orders = useSelector(
    (state) => state.order.orders,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrders(dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
    },
   
    {
      field: "createdAt",
      headerName: "Order time",
      width: 105,
    },
    {
      field: "amount",
      headerName: "Order amount",
      width: 90,
    },
    {
      field: "address",
      headerName: "Order address",
      width: 200,
    },
    {
      field: "status",
      headerName: "Order status",
      width: 90,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/order/getorder/" + params.row._id}
            >
             <RemoveRedEye/>
            </Link>
           
          </>
        );
      },
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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/user/" + params.row._id}>
    //           <button className="userListEdit">
    //             Edit
    //           </button>
    //         </Link>
    //         <DeleteOutline
    //           className="userListDelete"
    //           onClick={() =>
    //             handleDelete(params.row._id)
    //           }
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={orders}
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
