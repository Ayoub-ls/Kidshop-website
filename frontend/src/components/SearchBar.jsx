import { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({data}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }
    useEffect(() => {
    const searchLength = searchValue.length;
    if (searchLength > 0) {
      let filteredProducts = data.products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [searchValue, data.products]);
  return (
      <div className='flex w-fit relative bg-white rounded-2xl py-1 px-3 shadow-2xl gap-x-2'>
        <div className='w-6 flex items-center'>
          <img src={assets.search} className='w-full' />
        </div>
        <input type="text" value={searchValue} onChange={(e) => handleSearchChange(e)} className='rounded-4xl w-2xs py-1 px-3' />
        <div className='w-full max-h-75 overflow-y-auto absolute top-full left-1/2 mt-1.5 -translate-x-1/2 bg-white rounded-2xl shadow-2xl'>
          {
            searchResults && searchResults.length > 0 ?
          searchResults.map((product, index) => (
              <Link onClick={() => {
                  setSearchValue("");
              }}
                  to={`/product/${product.documentID}`} key={index} className='block p-2 hover:bg-gray-100'>
                  {product.name}
              </Link>
          )): null}
        </div>
      </div>
  )
}

export default SearchBar