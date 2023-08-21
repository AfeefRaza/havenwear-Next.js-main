import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart,AiOutlineCloseCircle,AiFillPlusCircle,AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useRef } from 'react';

const Navbar = ({Logout,cart,addtoCart,removefromCart,clearCart,subtotal,user}) => {
  const ref = useRef()
  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const toggleCart = () => {
    setSidebar(!sidebar)
  }

  return (
    <div><header className={`text-gray-600 body-font ${sidebar ? 'overflow-auto' : 'overflow-hidden'}`}>
    <div className={`container  flex flex-wrap p-5 flex-col md:flex-row items-center `}>
      <a className="flex mr-auto md:mr-5 title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image src="/logo.png" height={10} width={50}/>
        <span className="ml-3 text-xl">HavenWear</span>
      </a>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <Link href={"/hoodie"} className="mr-5 hover:text-gray-900">Hoodies</Link>
        <Link href={"/tshirts"} className="mr-5 hover:text-gray-900">T-shirts</Link>
        <Link href={"/popsockets"} className="mr-5 hover:text-gray-900">Pop-Sockets</Link>
        <Link href={"/Mugs"} className="mr-5 hover:text-gray-900">Mugs</Link>
        
      </nav>
      <div className='absolute right-0 flex flex-row items-center'>
      { user.value &&  <CgProfile onMouseEnter={()=>{setDropdown(true)}}  className=" text-3xl mr-5"/> }
      { dropdown &&  
      <div onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className='absolute top-9  bg-pink-500 right-20 rounded-xl w-36 text-lg text-white  '>
        <ul className='p-5'>
        <Link href={'./myaccount'}><li className='hover:text-pink-200 p-1'>My account</li></Link>
          <Link href={'./orderhistory'}><li className='hover:text-pink-200 p-1'>Orders</li></Link>
          <li onClick={Logout} className='hover:text-pink-200 p-1'>Logout</li>
        </ul>
      </div>
      }
       { !user.value && <Link href={"/login"} ><button className='text-l w-20 h-10 mr-5 bg-pink-400 text-white rounded-sm '>Login</button> </Link>}
      <AiOutlineShoppingCart onClick={toggleCart} className=" text-3xl md:text-4xl mr-5  top-6 cursor-pointer"/>
      </div>
      
        
      
    </div>
    <div ref={ref} className={`Sidecart w-72 h-[100vh] absolute top-0 bg-pink-100 p-10 transition-all z-10 ${sidebar ? 'right-0' : '-right-96'}`}>
      <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
      <span onClick={toggleCart} className='absolute top-4 left-2 text-pink-400 text-4xl cursor-pointer'><AiOutlineCloseCircle/></span>

      <ol className='list-decimal font-semibold '>
        {Object.keys(cart)==0 &&
        <div>
          cart is empty
        </div>
         }
      {
         Object.keys(cart).map((k)=>{return<li key={k}>
          <div className='item flex my-5 font-semibold items-center'>
            <div className='w-2/3'> {cart[k].name} ({cart[k].size}/{cart[k].variant}) </div>
            <div className='w-1/3 flex items-center justify-center text-lg' > <AiFillMinusCircle className='cursor-pointer text-pink-400'  onClick={() =>{removefromCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} /> <span className='mx-2'> {cart[k].qty}</span> <AiFillPlusCircle onClick={() =>{addtoCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-400'/></div>
          </div>
          </li>}
         )
         
        }
        
         
        
          
        <div className="total">subtotal: Rs.{subtotal}  </div>
      </ol>
      <div className="flex">
      <Link href={"/checkout"}><button disabled={Object.keys(cart).length == 0} className="flex mx-auto mt-5 text-white disabled:bg-pink-200 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg items-center"><BsFillBagCheckFill/>   Checkout</button></Link>
      <button disabled={Object.keys(cart).length == 0} className="flex mx-auto mt-5 text-white disabled:bg-pink-200 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg items-center" onClick={()=> {clearCart()}} >Clear Cart</button>
      </div>
      
    </div>
  </header></div>
  )
}

export default Navbar