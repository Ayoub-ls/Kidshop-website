import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/GlobalContext'
import { useQuery } from '@apollo/client/react'
import SearchBar from '../components/SearchBar'
import  ProductList  from '../components/ProductList'
import { gql } from '@apollo/client'
import Loading from '../components/Loading'

const GET_PRODUCTS = gql`
query {
  products {
    documentId,
    name,
    images {
      url
    },
    date
  }
}
`
const Home = () => {
  const {categories} = useContext(ProductContext)
  const [selectedCategorie, setSelectedCategorie] = useState('All')
  const {data, error, loading} = useQuery(GET_PRODUCTS)


    if (loading) {
    return <div className="h-screen flex justify-center items-center"><Loading/></div>;
  }
  
  if (error) {
    return <h1 className="text-red-500">{error.message}</h1>;
  }
  
  return (
    <div className='flex flex-col gap-y-9 items-center'>
      {/* search bar */}
        <SearchBar data={data}/>
      {/*end search bar */}
      {/* sold */}
      <div className='w-91.25 shadow gap-3 bg-main justify-between items-center flex rounded-sold h-42'>
        <Link to='/' className='flex justify-center items-center'>
          <h1 className='text-black w-1/2 font-bold text-2xl'>Get Ur Spetial Sale Up To 30%</h1>
          <img src={assets.sale_img} className='w-1/3' />
        </Link>
      </div>
      {/* end sold */}
      {/* products */}
      <div className='w-full'>
        <div className='pl-6 py-1 flex gap-x-6.5 overflow-scroll'>
          {
            categories.map((categorie, index)=>(
              <div key={index} onClick={() => setSelectedCategorie(categorie)} className='py-1 cursor-pointer text-sm font-semibold shadow px-2 bg-sec rounded-full'>
                {categorie}
              </div>
            ))
          }
        </div>
         <ProductList selectedCategorie={selectedCategorie} data={data}/>
      </div>
      {/* end products */}
    </div>
  )
}

export default Home