import "./productList.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  deleteProduct,
  getAllProducts,
} from "../../redux/apiRequest";
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default function ProductList() {
  const products = useSelector(
    (state) => state.product.products,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.img}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200,
    },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/product/" + params.row._id}
            >
              <button className="productListEdit">
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        components={{
          Toolbar: MyExportButton,
        }}
      />
    </div>
  );
}
