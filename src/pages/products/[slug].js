import { useState,useEffect } from "react"
import mongoose from "mongoose"
import Product from "../../../models/Product"
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'
const Post = ({Buynow,addtoCart, product, variants, error}) => {
  
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const router = useRouter()
 useEffect(() => {
  if(!error){
    setColor(product.color)
    setSize(product.size)
  }
   
 }, [router.query])
 
 const refreshVariant = (nsize,ncolor) =>{
  console.log(variants[ncolor][nsize]['slug'])
  let url = (`${process.env.NEXT_PUBLIC_HOST}/products/${variants[ncolor][nsize]['slug']}`)
  router.push(url)

}
  
  
  const CheckService = async ()=>{
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    const pinJson = await pins.json()
    
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success("This pincode is serviceable", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    } else {
      setService(false)
      toast.error("Sorry, pincode is not serviceable", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  const onChangepin = (e) =>{
    
    setPin(e.target.value)
  }
  if (error == 404) {
    return <Error statusCode={404} />
  }
  return <>
  <ToastContainer />
  <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-70 object-cover object-center rounded px-3" src={product.img}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">HavenWear</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
        {/* <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div> */}
        <p className="leading-relaxed">{product.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>

            {Object.keys(variants).includes('Blue') &&  Object.keys(variants['Blue']).includes(size) &&   <button onClick={(e)=> refreshVariant(size,'Blue')} className={`border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 ${color === 'Blue' ? " border-gray-500" : " border-black" } `}></button> }
            {Object.keys(variants).includes('Yellow') &&  Object.keys(variants['Yellow']).includes(size) &&   <button onClick={(e)=> refreshVariant(size,'Yellow')} className={`border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 ${color === 'Yellow' ? " border-gray-500" : " border-black" } `}></button> }
            {Object.keys(variants).includes('White') &&  Object.keys(variants['White']).includes(size) &&   <button onClick={(e)=> refreshVariant(size,'White')} className={`border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 ${color === 'White' ? " border-gray-500" : " border-black" } `}></button> }
            {Object.keys(variants).includes('Black') &&  Object.keys(variants['Black']).includes(size) &&  <button onClick={(e)=> refreshVariant(size,'Black')} className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 ${color === 'Black' ? " border-gray-500" : " border-black" } `}></button> }
            {Object.keys(variants).includes('Green') &&  Object.keys(variants['Green']).includes(size) && <button onClick={(e)=> refreshVariant(size,'Green')} className={`border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 ${color === 'Green' ? " border-gray-500" : " border-black" } `}></button> }
            {Object.keys(variants).includes('Purple') && Object.keys(variants['Purple']).includes(size) &&  <button onClick={(e)=> refreshVariant(size,'Purple')} className={`border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 ${color === 'Purple' ? " border-gray-500" : " border-black" } `}></button> }
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={size} onChange={(e)=> refreshVariant(e.target.value,color)} className="rounded border appearance-none border-gray-300 py-2  focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                { color && Object.keys(variants[color]).includes('S') && <option value={"S"} >S</option>}
                { color && Object.keys(variants[color]).includes('M') && <option value={"M"} >M</option>}
                { color && Object.keys(variants[color]).includes('L') && <option value={"L"} >L</option>}
                { color && Object.keys(variants[color]).includes('XL') && <option value={"XL"} >XL</option>}
                { color && Object.keys(variants[color]).includes('XXL') && <option value={"XXL"} >XXL</option>}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">Rs.{product.price}</span>}
          {product.availableQty <=0 && <span className="title-font font-medium text-2xl text-red-700">OUT OF STOCK!</span>}
          
          <button disabled={product.availableQty <=0} onClick={() => {Buynow(product.slug,1,product.title,product.price,size,color)}} className="flex ml-2 md:ml-auto text-white disabled:bg-pink-200 bg-pink-500 border-0 py-2  px-2 md:px-6  }  hover:bg-pink-600 rounded">Buy Now!</button>
          <button disabled={product.availableQty <=0} onClick={() => {addtoCart(product.slug,1,product.title,product.price,size,color)}} className="flex ml-2 md:ml-auto text-white disabled:bg-pink-200 bg-pink-500 border-0 py-2  px-2 md:px-6  }  hover:bg-pink-600 rounded">Add to Cart</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="pin mt-5 flex">
          <input type="text" onChange={onChangepin} placeholder="Enter your pincode" className='border-2 mx-2 border-gray-300 rounded-md' />
          <button onClick={CheckService} className='text-white bg-pink-500 border-0 py-2 px-6 ${color === "white" }  hover:bg-pink-600 rounded'>Check</button>
          
        </div>
        {!service && service != null && <div className="text-red-500 mt-2 mx-2">Sorry! We don't serve in your area yet</div>}
        {service && service != null &&<div className="text-green-500 mt-2 mx-2">Yay! we serve in your area</div>}
      </div>
    </div>
  </div>
</section>
  </>
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  return handler(req,res);
}
  let error = 404;
 // importing product on basis of slug  from Product database and we write Findone because there is only one product of each slug
  let product = await Product.findOne({slug: context.query.slug})
  if (product == null) {
    return{
      props: {error:error},
    }
  }
  // finding variants on basis of product title
  let variants = await Product.find({title: product.title})

  let ColorSizeSlug = {}
  for(let item of variants){
    //if the Color size slug already contains the color
    if (Object.keys(ColorSizeSlug).includes(item.color)) {
      ColorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
    else{
      ColorSizeSlug[item.color] = {}
      ColorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
  }

  return {
    props: {product: JSON.parse(JSON.stringify(product)), 
      variants: JSON.parse(JSON.stringify(ColorSizeSlug)) 
    }, 
  }
}


export default Post