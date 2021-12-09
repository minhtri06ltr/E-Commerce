const Product = require("../models/product");
const Order = require("../models/order");
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Create product successfull",
      savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          //set new info to product in database
          $set: req.body,
        },
        { new: true },
      );
    res.status(200).json({
      success: true,
      message: "Update product successfull",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong ",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id,
    );
    res.status(200).json({
      success: true,
      message: "Product has been delete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Get product successfull",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;
    //get 5 newest products if queryNew = true
    if (queryNew) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(1);
    }
    //get exactly all products has category  if queryCategory = category
    else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    }
    //get all products
    else {
      products = await Product.find();
    }

    res.status(200).json({
      success: true,
      message: "Get all products successfull",
      products, //return array
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};
exports.getProductSale = async (req, res) => {
  try {
    const orders = await Order.find();
  
    let count = 0;
    orders.map((item,index)=>{
      item.products.map(product=>{
        if(product.productId.toString() === req.params.id){
          count++;
        }
      })
    })
  
   
    res.status(200).json({
      success: true,
      message: "Count sale successfull",
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};
