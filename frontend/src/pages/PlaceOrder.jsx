import React, { useContext, useState } from 'react'
import { algerianWilayas } from '../assets/assets'
import { ProductContext } from '../context/GlobalContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {getTotalPrice, currency, token, fee} = useContext(ProductContext)
  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    wilayaValue:''
  })
  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({...data, [name]: value}))
  }
  const onSubmitHandler = async(e)=>{
    e.preventDefault()
  }
  return (
    <div className='mt-20'>
        <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col justify-center items-center gap-3 '>
          <input className='px-2 py-1 rounded-xl bg-white shadow-xl w-3/4' name='name' value={formData.name} onChange={(e)=> onChangeHandler(e)} type="text" placeholder='Name' />
          <input className='px-2 py-1 rounded-xl bg-white shadow-xl w-3/4' name='phone' value={formData.phone} onChange={(e)=> onChangeHandler(e)} type="tel" placeholder='Phone Number' />
          <select name='wilayaValue' value={formData.wilayaValue} onChange={(e)=> onChangeHandler(e)} className='px-2 py-1 rounded-xl w-1/4 bg-white shadow-xl mb-20' id="">
            {
              algerianWilayas.map((wilaya, index) => <option key={index}>
                {wilaya}
              </option>)
            }
          </select>
          {/*Pricing and Order button*/}
          <div className='flex gap-16 mx-10'>
            <div className='text-center'>
                <h2 className='font-semibold text-gray-400 mb-1.5 text-sm'>Total Price</h2>
                <h1 className='font-bold text-3xl'>{getTotalPrice()} {currency}</h1>
            </div>
            <button type='submit' className='text-xl flex flex-1 items-center rounded-full bg-main px-6 justify-center '>Order</button>
          </div>
        </form>
    </div>
  )
}

export default PlaceOrder