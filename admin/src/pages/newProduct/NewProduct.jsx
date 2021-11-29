import "./newProduct.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(
    [],
  );
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.name,
      };
    });
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();

    //set unique to filename
    const fileName =
      new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
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
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
          };
          addProduct(product, dispatch);
        });
      },
    );
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">
        New Product
      </h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Product name"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Product description"
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder="Product price"
            onChange={handleChange}
            name="price"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Product categories"
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select
            onChange={handleChange}
            name="inStock"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          onClick={handleClick}
          className="addProductButton"
        >
          Create
        </button>
      </form>
    </div>
  );
}
