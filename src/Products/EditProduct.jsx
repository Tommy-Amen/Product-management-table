import axios from "axios";
import React, { useEffect, useState } from "react";

const initialProductInfo = {
  id: "",
  name: "",
  price: "",
  category: "",
  rating: "",
};

export default function EditProducts(props) {
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  useEffect(() => {
    setProductInfo({ ...productInfo, id: props.productId });
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        "https://mock-data-josw.onrender.com/products/" + props.productId
      );

      if (response) {
        setProductInfo(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editProductInfo = async () => {
    try {
      const response = await axios.put(
        "https://mock-data-josw.onrender.com/products/" + props.productId,
        productInfo
      );
      if (response) {
        props.setProductEdited();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-9  items justify-center border border-gray-300 rounded px-14 py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="mb-1">Name:</span>
            <input
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
              type="text"
              className="border border-gray-300 text-sm rounded-lg py-2 px-2"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="flex flex-col">
            <span className="mb-1">Price: </span>
            <input
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
              type="text"
              className="border border-gray-300 text-sm rounded-lg py-2 px-2"
              placeholder="Enter Product Price"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="mb-1">Category: </span>
            <input
              value={productInfo.category}
              onChange={(e) =>
                setProductInfo({ ...productInfo, category: e.target.value })
              }
              type="text"
              className="border  border-gray-300 text-sm rounded-lg py-2 px-2"
              placeholder="Enter Product Price"
            />
          </div>
          <div className="flex flex-col">
            <span className="mb-1">Rating: </span>
            <input
              value={productInfo.rating}
              onChange={(e) =>
                setProductInfo({ ...productInfo, rating: e.target.value })
              }
              type="text"
              className="border  border-gray-300 text-sm rounded-lg py-2 px-2"
              placeholder="Enter Product Rating"
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={() => {
            editProductInfo();
          }}
          className="text-sm shadow hover:bg-black/85 cursor-pointer transition-all duration-200  bg-black text-white px-3 py-2 rounded mt-4"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}
