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
    <div><header className={`text-text body-font ${sidebar ? 'overflow-auto' : 'overflow-hidden'} border-solid border-4 border-text`}>
    <div className={`container  flex flex-wrap  flex-col md:flex-row items-center   `}>
      <a className="flex mr-auto md:mr-5 p-5 title-font font-medium items-center border-r-4 border-text text-gray-900 mb-4 md:mb-0">
        <Image src="/logo.png" className='w-14 h-1w-14' height={10} width={50}/>
        <span className="ml-3 text-3xl text-text ">HavenWear</span>
      </a>
      <nav className=" p-5 w-auto  	flex flex-wrap items-center text-xl justify-center">
        <Link href={"/hoodie"} className="mr-5  hover:text-gray-900">Hoodies</Link>
        <Link href={"/tshirts"} className="mr-5  hover:text-gray-900">T-shirts</Link>
        <Link href={"/popsockets"} className="mr-5  hover:text-gray-900">Pop-Sockets</Link>
        <Link href={"/Mugs"} className="mr-5  hover:text-gray-900">Mugs</Link>
        
      </nav>
      <div className='absolute right-0 p-5 flex flex-row items-center border-text border-l-4'>
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
       { !user.value && <Link href={"/login"} ><button className='text-l w-20 h-10 mr-5 bg-primary text-background rounded-sm '>Login</button> </Link>}
      <AiOutlineShoppingCart onClick={toggleCart} className=" text-3xl md:text-4xl mr-5  top-6 cursor-pointer"/>
      </div>
      
        
      
    </div>
   

<div ref={ref}
  className={`absolute w-screen max-w-sm border border-text bg-secondary px-4 py-8 sm:px-6 lg:px-8 ${sidebar ? 'right-0' : '-right-96'}`}
  aria-modal="true"
  role="dialog"
   tabIndex="-1"
>
  <button onClick={toggleCart} className="absolute end-4 top-4 text-text transition hover:scale-110">
    <span className="sr-only">Close cart</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
       strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
         strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  <div className="mt-4 space-y-6">
    <ul className="space-y-4">
    
        {Object.keys(cart)==0 &&
        <div>
          cart is empty
        </div>
         }
      {
         Object.keys(cart).map((k)=>{return<li key={k} className="flex items-center gap-4">
         <img
           src={cart[k].img}
           alt=""
           className="h-16 w-16 rounded object-cover"
         />
 
         <div>
           <h3 className="text-sm text-gray-900">{cart[k].name}</h3>
 
           <dl className="mt-0.5 space-y-px text-[10px] text-text">
             <div>
               <dt className="inline">Size:</dt>
               <dd className="inline">{cart[k].size}</dd>
             </div>
 
             <div>
               <dt className="inline">Color:</dt>
               <dd className="inline">{cart[k].variant}</dd>
             </div>
           </dl>
         </div>
 
         <div className="flex flex-1 items-center justify-end gap-2">
         <button className="text-text transition hover:text-red-600" onClick={() =>{removefromCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}}>
             <span className="sr-only">Remove item</span>
 
             -
           </button>
           <form>
             <label htmlfor="Line1Qty" className="sr-only"> Quantity </label>
 
             <input
               type="number"
               min="1"
               value={cart[k].qty}
               id="Line1Qty"
               className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-text [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
             />
           </form>
 
           <button className="text-text transition hover:text-red-600" onClick={() =>{addtoCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}}>
             <span className="sr-only">Add item</span>
 
             +
           </button>
         </div>
       </li>
            
            
          
          // <div className='w-1/3 flex items-center justify-center text-lg' > <AiFillMinusCircle className='cursor-pointer text-pink-400'  onClick={() =>{removefromCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} /> <span className='mx-2'> {cart[k].qty}</span> <AiFillPlusCircle onClick={() =>{addtoCart(k,1,cart[k].name,cart[k].price,cart[k].size,cart[k].variant)}} className='cursor-pointer text-pink-400'/></div>
          }
         )
         
        }

         
        
          
        
      
      

      
    </ul>

    <div className="space-y-4 text-center">
      
    <p  className="block rounded border border-text px-5 py-3 text-sm text-text transition hover:ring-1 hover:ring-gray-400">subtotal: Rs.{subtotal} </p>
      <Link href={"/checkout"} className="block rounded bg-primary px-5 py-3 text-sm text-gray-100 transition hover:bg-text">Checkout</Link>

      <a href="#"className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-text" onClick={()=> {clearCart()}}>Clear Cart </a>
    </div>
  </div>
</div>
    {/* <div ref={ref} className={`Sidecart w-72 h-[100vh] absolute top-0 bg-pink-100 p-10 transition-all z-10 ${sidebar ? 'right-0' : '-right-96'}`}>
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
      <button disabled={Object.keys(cart).length == 0} className="flex mx-auto mt-5 text-white disabled:bg-pink-200 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg items-center"  >Clear Cart</button>
      </div>
      
    </div> */}
  </header></div>
  )
}

export default Navbar