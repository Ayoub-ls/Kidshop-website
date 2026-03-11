import React from "react";
import { useContext } from "react";
import { ProductContext } from "../context/GlobalContext";
import { assets } from "../assets/assets";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CARTDATA = gql`
  query {
    cartData {
      product {
        documentId
        name
        price
        images {
          url
        }
      }
      variants {
        size
        quantity
      }
    }
  }
`;

const Card = () => {
  const {
    currency,
    getTotalPrice,
    removeSizeFromCart,
    navigate,
    backendUrl,
  } = useContext(ProductContext);

  const { data, loading, error } = useQuery(GET_CARTDATA);

  if (loading) return <h3>LOADING...</h3>;
  if (error) return <h3>{error.message}</h3>;

  return (
    <div>
      <div className="flex flex-col pb-20 gap-20">
        <div className="flex flex-col gap-7 mx-1 my-10">
          {data?.cartData && data.cartData.length > 0 ? (
            data.cartData.map((item, index) => {
              const productData = item.product;
              const cartVariants = item.variants || [];

              // first image url
              const imgUrl =
                productData?.images?.[0]?.url
                  ? backendUrl + productData.images[0].url
                  : "";

              // render EACH variant as its own cart row
              return cartVariants.map((variant, vIndex) => (
                <div
                  key={`${index}-${vIndex}`}
                  className="flex shadow bg-white rounded-2xl h-28 justify-between p-1.5"
                >
                  <div className="flex gap-3.5">
                    <div className="h-full">
                      <img
                        className="h-full rounded-2xl"
                        src={imgUrl}
                        alt={productData?.name}
                      />
                    </div>

                    <div className="flex flex-col justify-between items-center py-1">
                      <h1 className="text-sm">{productData.name}</h1>

                      <h1 className="bg-main p-0.5 rounded-lg w-4.5 text-center text-sm">
                        {variant.size}
                      </h1>

                      <h1 className="font-bold text-sm">
                        {productData.price} {currency}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <input
                      className="border rounded-lg max-w-10 px-1 sm:px-2 py-0.5 bg-slate-50"
                      type="number"
                      min={1}
                      defaultValue={variant.quantity}
                      readOnly
                    />

                    <div
                      onClick={() =>
                        removeSizeFromCart(productData.documentId, variant.size)
                      }
                      className="w-6 p-0.5 bg-main rounded-md mt-7 cursor-pointer"
                    >
                      <img src={assets.done} alt="remove" className="w-full" />
                    </div>
                  </div>
                </div>
              ));
            })
          ) : (
            <div className="flex my-5 justify-center items-center">
              <h1 className="font-bold text-xl">No Products in card...</h1>
              <img src={assets.sad_imoji} className="w-40" alt="sad" />
            </div>
          )}
        </div>

        <div className="flex gap-16 mx-10">
          <div className="text-center">
            <h2 className="font-semibold text-gray-400 mb-1.5 text-sm">
              Total Price
            </h2>
            <h1 className="font-bold text-3xl">
              {getTotalPrice()} {currency}
            </h1>
          </div>

          <button
            onClick={() => navigate("place-order/")}
            className="text-xl flex flex-1 items-center rounded-full bg-main px-6 justify-center"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
