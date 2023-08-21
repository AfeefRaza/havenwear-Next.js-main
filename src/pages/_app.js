import '@/styles/globals.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  
  const [subtotal, setSubtotal] = useState(0)
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(50)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try {
      // we are checking if there are items already in the cart when customer visit the site again if yes then we will update the cart state from local storage
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      setUser({value: myuser.token , email: myuser.email})
      
      
    }
    setKey(Math.random)
  }, [router.query])
  const Logout = ()=>{
    localStorage.removeItem('myuser')
    setUser({value:null })
    setKey(Math.random)
    toast.success("You have logged out", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  }
  // this function is updating the cart in local storage so customer can also access it later
  const saveCart = (myCart) =>{
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart)
   
    for (let i = 0; i<keys.length; i++) {
      subt += myCart[keys[i]].price  * myCart[keys[i]].qty
      
    }
    setSubtotal(subt)
    
  }
  // this is a function to add product to cart
  const addtoCart = (itemcode,qty,name,price,size,variant) =>{
    let newCart = cart;
    //checking if the product already exist in cart
    if (itemcode in cart ) {
      // if it exist we will increase in qty
      newCart[itemcode].qty = cart[itemcode].qty + qty
    } else {
      // if it doesnt exist we will push it in the cart and set its qty to 1
      newCart[itemcode] = {qty:1,price , name, size , variant}
    }
    // we will update the state of the cart to new cart
    setCart(newCart)
    
    // we will update the cart in local storage
    saveCart(newCart)
    toast.success("Item added to the cart", {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })


  }
  // this is a function to remove product to cart
  const removefromCart = (itemcode,qty,name,price,size,variant) =>{
    let newCart = cart;
    //checking if the product already exist in cart
    if (itemcode in cart ) {
      // if it exist we will decrease in qty
      newCart[itemcode].qty = cart[itemcode].qty - qty
    } 
    if(newCart[itemcode]["qty"]<=0){
      // if its qty is 0 or less than zero we will remove it from cart on minus
      delete newCart[itemcode]
    }
    setCart(newCart)
    saveCart(newCart)


  }
  
  const clearCart = ()=>{
    // this will clear all the items in cart
    localStorage.removeItem('cart')
    setCart({})
    saveCart({})
  }
  const Buynow = (itemcode,qty,name,price,size,variant)=> {
    let newCart = {};
     newCart[itemcode] = {qty:1,price , name, size , variant};
    setCart(newCart)
    saveCart(newCart)
    router.push("/checkout")

  }
  return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
      />  
  <Navbar Logout={Logout} user={user} key={key} cart={cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subtotal={subtotal} />
  <Component cart={cart} Buynow={Buynow} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
  <Footer/>
  </>
  )
}
