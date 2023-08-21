import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {AiOutlineCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const checkout = ({cart,clearCart,addtoCart,removefromCart,subtotal}) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [number, setNumber] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value:null})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))
  if (user && user.token) {
    setUser(user)
    setEmail(user.email)
    
  }
  }, [])
  
  
  const handleChange = async (e) =>{
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {

      setPincode(e.target.value)
      if (e.target.value.length == 4) {
        const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      const pinJson = await pins.json()
      if (Object.keys(pinJson).includes(e.target.value)) {
        setCity(pinJson[e.target.value][0])
        setProvince(pinJson[e.target.value][1])
      }
        
      }
    
    }
    else if (e.target.name == 'number') {
      setNumber(e.target.value)
    }
    
    
      if (email.length>3 && name.length>3 && address.length>3 && pincode.length>3 && number.length>3) {
        setDisabled(false)
        
      } 
      else {
        setDisabled(true)
      }
    
    
  }
  const placeOrder = async ()=>{
    let oid = Math.floor(Math.random() * Date.now());
    const data = {cart, subtotal,oid, email , name , address, pincode,number}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json();
    if (res.success) {
      // console.log(res.order._id)
    router.push('/receipt?id=' + await res.order._id, 200)
    clearCart()
    }
    else{
      if (res.CartClear) {
        clearCart()
      }
      
      toast.error(res.error , {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }


  }
  
  return (

    <div>
      <ToastContainer />
        <h1 className='font-bold text-4xl text-center'>Checkout!</h1>
        <div className="p-10 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-xl text-gray-600 font-semibold ">Name</label>
            <input placeholder='Steve Smith'  onChange={handleChange} value={name}  type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-xl text-gray-600 font-semibold">Email</label>
            {user && user.token ? <input placeholder='smith@gmail.com'  value={user.email} type="email" id="email" name="email" className="w-full bg-gray-500 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-default" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>}
            
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="address" className="leading-7 text-xl text-gray-600 font-semibold">Adress</label>
            <textarea onChange={handleChange} value={address} placeholder='1234 Elm Street Citytown, Stateville' type="text" id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="pincode" className="leading-7 text-xl text-gray-600 font-semibold">Pincode</label>
            <input onChange={handleChange} value={pincode} placeholder='1000,2000,3000,4000' type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="number" className="leading-7 text-xl text-gray-600 font-semibold">PhoneNumber</label>
            <input onChange={handleChange} value={number} placeholder='03182883504' type="number" id="number" name="number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="city" className="leading-7 text-xl text-gray-600 font-semibold">CITY</label>
            <input onChange={handleChange} value={city} placeholder='It will be autofilled '  type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="province" className="leading-7 text-xl text-gray-600 font-semibold">Province</label>
            <input onChange={handleChange} value={province} placeholder='It will be autofilled '  type="text" id="province" name="province" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          
        </div>
        </div>
        </div>

        <h1 className='font-bold text-4xl text-center'>Review your Cart!</h1>
        <div className="Sidecart m-4 rounded-md bg-pink-100 p-10 z-10">

      <ol className='list-decimal font-semibold '>
        {Object.keys(cart)==0 &&
        <div>
          cart is empty
        </div>
         }
      {
         Object.keys(cart).map((k)=>{return<li key={k}>
          <div className='item flex my-5 font-semibold items-center'>
            <div className='w-2/3'> {cart[k].name} </div>
            <div className='w-1/3 flex items-center justify-center text-lg' > <AiFillMinusCircle className='cursor-pointer text-pink-400'  onClick={() =>{removefromCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} /> <span className='mx-2'> {cart[k].qty}</span> <AiFillPlusCircle onClick={() =>{addtoCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-400'/></div>
          </div>
          </li>}
         )
         
        }
        
         
        
          
        <div className="total">subtotal: Rs.{subtotal}  </div>
      </ol>
      <div className="flex">
      <button disabled={disabled} onClick={placeOrder} className="flex disabled:bg-pink-300 mx-auto mt-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg items-center"><BsFillBagCheckFill/> Pay now: Rs.{subtotal} </button>
      
      </div>
      
    </div>
        </div>

  )
}

export default checkout