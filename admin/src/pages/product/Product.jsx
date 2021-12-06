import {
  Link,
  useLocation,
} from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";

import { Publish } from "@material-ui/icons";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { userRequest } from "../../helper/requestMethods";
import { updateProduct } from "../../redux/apiRequest";
export default function Product() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const location = useLocation();
  const productId =
    location.pathname.split("/")[2];
  //get single product using id
  const [productStats, setProductStats] =
    useState([]);
  const product = useSelector((state) =>
    state.product.products.find(
      (product) => product._id === productId,
    ),
  );
  const [inputs, setInputs] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    inStock: product.inStock,
  });
  const [productSale,setProductSale] = useState(0)
  const [sizes, setSizes] = useState(
    product.size,
  );
  const [colors, setColors] = useState(
    product.color,
  );
  console.log(inputs);
  const [categories, setCategories] = useState(
    product.categories,
  );
  const [review, setReview] = useState(
    product.img,
  );
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    [],
  );
  useEffect(()=>{
    const getSale = async()=>{
      try {
          const response = await userRequest.get(`/products/getproductsale/${productId}`)
        setProductSale(response.data.count)
        } catch (error) {
        console.log(error)
      }
    }
    getSale()
  },[])
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await userRequest.get(
          "orders/income?pid=" + productId,
        );
        const list = response.data.income.sort(
          (a, b) => {
            return a._id - b._id;
          },
        );
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              Sales: item.total,
            },
          ]),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleSizes = (e) => {
    setSizes(e.target.value.split(","));
  };
  const handleColors = (e) => {
    setColors(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();

    if (!file) {
      const newProduct = {
        ...inputs,
        color: colors,
        size: sizes,
        categories: categories,
      };
      updateProduct(
        dispatch,
        newProduct,
        product._id,
      );
    } else {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        product.img,
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        file,
      );
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred /
              snapshot.totalBytes) *
            100;
          console.log(
            "Upload is " + progress + "% done",
          );
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(
            uploadTask.snapshot.ref,
          ).then((downloadURL) => {
            const newProduct = {
              ...inputs,
              img: downloadURL,
              categories: categories,
              color: colors,
              size: sizes,
            };
            updateProduct(
              dispatch,
              newProduct,
              product._id,
            );
          });
        },
      );
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">
            Create
          </button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">
              {product.title}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">
                id:
              </span>
              <span className="productInfoValue">
                {product._id}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">
                Sales:
              </span>
              <span className="productInfoValue">{productSale}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">
                In Stock:
              </span>
              <span className="productInfoValue">
                {product.inStock
                  .toString()
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={inputs.title}
              onChange={handleChange}
              name="title"
            />
            <label>Product Description</label>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              value={inputs.description}
            />
            <label>Product Categories</label>
            <input
              type="text"
              value={categories}
              onChange={handleCategories}
            />
            <label>Product Sizes</label>
            <input
              type="text"
              value={sizes}
              onChange={handleSizes}
            />
            <label>Product Colors</label>
            <input
              type="text"
              value={colors}
              onChange={handleColors}
            />
            <label>Product Price</label>
            <input
              type="number"
              value={inputs.price}
              onChange={handleChange}
              name="price"
            />
            <label>In Stock</label>
            <select
              defaultValue={inputs.inStock}
              name="inStock"
              id="idStock"
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={review}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  const [previewFile] =
                    e.target.files;
                  if (previewFile) {
                    setReview(
                      URL.createObjectURL(
                        previewFile,
                      ),
                    );
                  }
                }}
                style={{ display: "none" }}
              />
            </div>
            <button
              onClick={handleClick}
              className="productButton"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
