import { createContext, useEffect, useState } from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { STRAPI_URL } from "../App";

export const ProductContext = createContext();

const GlobalContext = ({ children }) => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const currency = "DZD";
  const fee = 10;

  
{/*const strapiFetch = async (url, { token, method = "GET", body } = {}) => {
  const res = await fetch(`${STRAPI_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return json;
};

const getMe = async (token) => {
  return await strapiFetch("/api/users/me", { token });
};

const normalizeCart = (cartEntry) => {
  if (!cartEntry) return null;

  const cart = {
    id: cartEntry.id,
    ...cartEntry.attributes,
  };

  // items already come as array of components
  cart.items = cart.items || [];
  return cart;
};

const getCart = async (token) => {
  const me = await getMe(token);

  const query = new URLSearchParams({
    "filters[user][id][$eq]": me.id,
    "filters[status][$eq]": "active",
    "populate[items][populate]": "product",
  }).toString();

  const res = await strapiFetch(`/api/carts?${query}`, { token });

  const cartEntry = res?.data?.[0]; // active cart
  if (cartEntry) return normalizeCart(cartEntry);

  // create cart if not exists
  const created = await strapiFetch("/api/carts", {
    token,
    method: "POST",
    body: {
      data: {
        user: me.id,
        status: "active",
        items: [],
      },
    },
  });

  return normalizeCart(created.data);
};

const addToCart = async (
  token,
  cart,
  product,
  size,
  qty = 1
) => {
  if (!cart?.id) throw new Error("Cart not loaded");
  if (!product?.id) throw new Error("Product missing numeric id");
  if (!size) throw new Error("Size is required");

  const items = [...(cart.items || [])];

  // find existing cart item (same product + same size)
  const idx = items.findIndex(
    (i) => i.product?.data?.id === product.id && i.size === size
  );

  if (idx === -1) {
    // create new item with snapshots
    const imgUrl =
      product?.attributes?.images?.data?.[0]?.attributes?.url || "";

    items.push({
      product: product.id, // relation expects numeric id
      size,
      quantity: qty,
      priceSnapshot: product.attributes.price,
      titleSnapshot: product.attributes.name,
      imageSnapshot: imgUrl,
    });
  } else {
    items[idx] = {
      ...items[idx],
      quantity: (items[idx].quantity || 0) + qty,
    };
  }

  const updated = await strapiFetch(`/api/carts/${cart.id}`, {
    token,
    method: "PUT",
    body: { data: { items } },
  });

  return normalizeCart(updated.data);
};
console.log(getCart(token));

*/}
  
  const getTotalPrice = () => {
    let totalPrice = 0;

    return totalPrice;
  }
  const logout = () =>{
    localStorage.removeItem('token')
    setToken('')
  }
  
  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  },[])
  
  const value = {
    categories,
    currency,
    fee,
//    addToCart,
    getTotalPrice,
    navigate,
    token,
    setToken,
    logout
  };
  
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default GlobalContext;