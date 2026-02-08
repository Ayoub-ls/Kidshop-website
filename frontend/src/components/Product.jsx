import { Link } from "react-router-dom"
import { assets } from "../assets/assets"
import { STRAPI_URL } from "../App"

const Product = ({product}) => {
    console.log(product);
    
  return (
    <Link to={`/product/${product.documentId}`} className='w-37.5 block'>
        <img className='w-full rounded-product' src={STRAPI_URL + product.images[0].url} />
        <div className='py-2 px-3.5 flex justify-between items-center'>
            <div>
                <h1 className='my-1.5 text-sm text-blue-950 font-bold'>{product.name}</h1>
                <p className="text-xs text-zinc-400">{product.date}</p>
            </div>
            <button className="bg-main cursor-pointer size-4 rounded-full p-0.5">
                <img src={assets.heart} className="w-full" />
            </button>
        </div>
    </Link>
  )
}

export default Product