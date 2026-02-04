import React from 'react';
import { useMemo } from 'react'
import Product from './Product';

export const ProductList = ({data, selectedCategorie}) => {
  

const categoryProducts = useMemo(() => {
    let filtered = data.products.slice();
    if (selectedCategorie !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategorie);
    }
    return filtered
  }, [data.products, selectedCategorie]);
  return (

    <div className='my-10 flex flex-wrap justify-center gap-x-10 '>
      {
        selectedCategorie === 'All' ?
        data.products && data.products.length > 0 ?
          data.products.map((product, index) => (
            <Product key={index} product={product}/>
          ))
        : null
        : categoryProducts && categoryProducts.length ? 
        categoryProducts.map((product, index) => (
            <Product key={index} product={product}/>
          ))
        : <div>No products found</div>
    }
    </div>
  )
}
