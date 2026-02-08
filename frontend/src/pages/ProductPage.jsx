import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { ProductContext } from "../context/GlobalContext";
import { gql } from "@apollo/client";
import { STRAPI_URL } from "../App";
import { useQuery } from "@apollo/client/react";

const GET_PRODUCT = gql`
  query GetProduct($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      name
      price
      discreption
      sizes {
        size
      }
      images {
        url
      }
      date
    }
  }
`;


const ProductPage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const { documentId } = useParams(); // this is your documentId
  const { currency, onClickOrder, addToCart } =
    useContext(ProductContext);

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { documentId: documentId },
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error: {error.message}</p>;

  
  const product = data?.product;
  const images =
    product?.images?.map((img) => img.url) || [];
    console.log(product);
    

  return (
    <div>
      <div className="flex shadow-2xl flex-col items-center rounded-b-[50px]">
        {/* Other images */}
        <div className="flex">
          {images.map((img, index) => {
            if (index === imageIndex) return null;
            return (
              <div
                key={index}
                className="w-1/3 bg-white min-h-full flex items-center border border-zinc-300 rounded-[10px] cursor-pointer"
              >
                <img
                  className="w-full cursor-pointer rounded-[10px]"
                  onClick={() => setImageIndex(index)}
                  src={img}
                  alt=""
                />
              </div>
            );
          })}
        </div>

        {/* Main image */}
        <div className="rounded-b-[50px] w-full">
          <img
            className="rounded-b-[50px] w-full"
            src={images?.[imageIndex]}
            alt=""
          />
        </div>
      </div>

      {/* name & price */}
      <div className="flex py-4 px-2.5 justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
        </div>
        <h1 className="font-bold text-xl">
          {product.price} {currency}
        </h1>
      </div>

      {/* description */}
      <div className="text-zinc-600 py-4 px-2.5 mb-16">
        {product.description}
      </div>

      {/* size btns */}
      <div className="flex justify-center my-10 gap-6">
        {product.sizes?.map((s, index) => (
          <button
            onClick={() => setSelectedSize(s.size)}
            key={index}
            className={`border rounded-full py-1.5 transition px-3 ${
              selectedSize === s.size ? "bg-main" : ""
            }`}
          >
            {s.size}
          </button>
        ))}
      </div>

      {/* buy btn */}
      <div className="px-5.5 flex justify-center w-full gap-8">
        <button
          onClick={() => onClickOrder(id, selectedSize)}
          className="text-xl flex flex-1 items-center rounded-full bg-main px-6 justify-center"
        >
          Order
        </button>

        <div className="bg-sec rounded-full w-1/5 p-6">
          <img
            className="w-full cursor-pointer"
            onClick={() => addToCart(id, selectedSize)}
            src={assets.basket}
            alt="basket"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
