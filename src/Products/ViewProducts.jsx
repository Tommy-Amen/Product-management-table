import axios from "axios";
import React, { useEffect, useState } from "react";
import { StarIcon, StarOff } from "lucide-react";

const initialProductInfo = {
  name: "",
  price: "",
  category: "",
  rating: "",
};

export default function ViewProducts(props) {
  const [productInfo, setProductInfo] = useState(initialProductInfo);
  const [toggleFavorite, setToggleFavorite] = useState(false);

  useEffect(() => {
    const storedFavoriteProduct =
      window.localStorage.getItem("favoriteProduct");
    if (storedFavoriteProduct !== null) {
      setToggleFavorite(JSON.parse(storedFavoriteProduct));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "favoriteProduct",
      JSON.stringify(toggleFavorite)
    );
  }, [toggleFavorite]);

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
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-black">
          Mark Product as Favorite
        </span>
        <button onClick={() => setToggleFavorite(!toggleFavorite)}>
          {toggleFavorite ? (
            <StarIcon className="text-yellow-500 cursor-pointer" />
          ) : (
            <StarOff className="text-gray-400 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
