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
      width: 200,
    },
    {
      field: "product",
      headerName: "Product Image",
      width: 100,
      renderCell: (params) => {
        return (
          <div
            className="productListItem"
            style={{ margin: "0 auto" }}
          >
            <img
              className="productListImg"
              src={params.row.img}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 100,
    },

    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 105,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 105,
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
