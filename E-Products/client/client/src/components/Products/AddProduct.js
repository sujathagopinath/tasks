import React, { useState } from 'react';
import '../../assests/CSS/AddProduct.css'
import { useForm } from "react-hook-form"; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../Redux/Actions/Products/productaction';



const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("reg", register);

  const history = useNavigate();
  const [productname, setProductname] = useState("");
  const [productnote, setProductnote] = useState("");
  const [price, setPrice] = useState("");
  const [productimage, setproductImage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    const data = {
      productname,
      productnote,
      price,
      productimage,
    };
    console.log("productimage", productimage.file);
    dispatch(createProduct(data));
    setproductImage(false);
    history("/products");
  };

  return (
    <div className="container">
      <div className="product-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("text", {
              required: "Product Name is required",
            })}
            className="form-control"
            placeholder="Product Name"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
          />

          {errors.text && <p className="error">{errors.text.message}</p>}

          <select
            value={productnote}
            onChange={(e) => setProductnote(e.target.value)}
            className="custom-select"
            required
          >
            <option value="Select a Note" required>
              Product Note
            </option>
            <option value="Groceries">Weight Loss and healthy Eating</option>
            <option value="lifestyle">Do What's makes you happy:)</option>
            <option value="Clothes">Wear with New styles!!</option>
            <option value="Furnitures">
              The key to Life is rearranging things
            </option>
            <option value="Veggies">Do not to Fight disease</option>
            <option value="Electronics">
              To connect the seemingly unconnected
            </option>
          </select>

          <input
            type="number"
            {...register("number", {
              required: "Price is required",
            })}
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {errors.number && <p className="error">{errors.number.message}</p>}

          <input
            type="file"
            {...register("file", {
              required: "image is required of type png jpg jpeg",
            })}
            name="productimage"
            className="form-control"
            onChange={(e) => setproductImage(e.target.files[0])}
            accept="png jpg jpeg"
          />
          {errors.file && <p className="error">{errors.file.message}</p>}

          <div>
            <button type="submit">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
