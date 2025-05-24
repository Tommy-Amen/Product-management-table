import axios from "axios";
import React, { useEffect, useState } from "react";

const initialProductInfo = {
  name: "",
  price: "",
  category: "",
  rating: "",
};

export default function ViewProducts(props) {
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  useEffect(() => {
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
  return (
    <div className=" flex flex-col gap-9  items justify-center border border-gray-300 rounded px-14 py-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="">Name:</span>
          <span className="font-bold">{productInfo.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="">Price: </span>
          <span className="font-bold">$ {productInfo.price}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span>Category: </span>
          <span className="font-bold">{productInfo.category}</span>
        </div>
        <div className="flex flex-col">
          <span className="">Rating: </span>
          <span className="font-bold">{productInfo.rating}</span>
        </div>
      </div>
    </div>
  );
}
