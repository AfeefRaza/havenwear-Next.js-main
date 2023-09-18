import Link from 'next/link'
import React from 'react'
import mongoose from "mongoose";
import Product from '../../models/Product'

const tshirts = ({product}) => {
  
  return (
    <div>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 gap-5 justify-center">
      
      { Object.keys(product).map((item)=>{

return <Link href={`/products/${product[item].slug}`} key={product[item].slug} className="block group border-text  border-4 w-auto  ">
  <img
    src={product[item].img}
    alt=""
    className="h-[350px] w-60 object-cover sm:h-[350px] "
  />

  <div className="mt-1.5 px-1">
  <div className=" mt-3 text-sm">
      <h3
        className="text-2xl group-hover:underline group-hover:underline-offset-4"
      >
        {product[item].title}
      </h3>

      <p className="text-2xl text-primary">Rs.{product[item].price}</p>
    </div>
    <div className="size">
  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
    product[item].size.includes(size) && (
      <span
        key={size}
        className="border border-grey-500 px-1 mx-1"
      >
        {size}
      </span>
    )
  ))}
</div>

    <div className="mt-1.5 flex gap-1">
      <form>
        <fieldset>
          <legend className="sr-only">Color</legend>
        </fieldset>

        <div
          className="flex flex-wrap justify-center gap-1 [&:hover_label]:opacity-75"
        >
          
          
  {[ 'purple', 'blue', 'yellow', 'pink', 'green'].map(color => (
    
    product[item].color.includes(color) && (
      
      // <button
      //   key={color}
      //   className={`border-2 border-gray-300 ml-1  bg-${color}-600 bg-black rounded-full w-6 h-6 focus:outline-none`}
      // ></button>
      
      <div className='pb-2'>
            <input type="checkbox" id="ColorSg" className="sr-only" />

            <label
              htmlFor="ColorSg"
              className={`block h-4 w-4 cursor-pointer rounded-full bg-${color.toLowerCase()}-500 transition `}
            >
              
            </label>
          </div>
    )
  ))}


          
          
        </div>
      </form>
    </div>

    
  </div>
</Link>

      //    <Link href={`/products/${product[item].slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full hover:shadow-md m-2">
      //   <div className="block relative rounded overflow-hidden">
      //     <img alt="ecommerce" className=" rounded-xl object-cover object-center m-auto h-[30vh] md:h-[33vh] md:w-[12vw] block" src={product[item].img}/>
      //   </div>
      //   <div className="mt-4 text-center">
      //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
      //     <h2 className="text-gray-900 title-font text-lg font-medium">{product[item].title}</h2>
      //     <p className="mt-1">Rs.{product[item].price}</p>
      //     <div className="size">
      //       {product[item].size.includes('S') && <span className='border border-grey-500 px-1 mx-1'>S</span> }
      //       {product[item].size.includes('M') && <span className='border border-grey-500 px-1 mx-1'>M</span> }
      //       {product[item].size.includes('L') && <span className='border border-grey-500 px-1 mx-1'>L</span> }
      //       {product[item].size.includes('XL') && <span className='border border-grey-500 px-1 mx-1'>XL</span> }
      //       {product[item].size.includes('XXL') && <span className='border border-grey-500 px-1 mx-1'>XXL</span> }
      //     </div>
      //     <div className="color">
      //       {product[item].color.includes('blue') || product[item].color.includes('Blue') &&   <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button> }
      //       {product[item].color.includes('yellow') || product[item].color.includes('Yellow') &&   <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button> }
      //       {product[item].color.includes('white') || product[item].color.includes('White') &&   <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button> }
      //       {product[item].color.includes('black') || product[item].color.includes('Black') &&  <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button> }
      //       {product[item].color.includes('green') || product[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button> }
      //       {product[item].color.includes('purple') || product[item].color.includes('Purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button> }
      //     </div>
      //   </div>
      // </Link>
      })
      }
      
      
      </div>
    </div>
  
</section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  return handler(req,res);
}


  let products = await Product.find({category: "tshirt"})
  let tshirts = {}
    
    for(let item of products){
      if (item.title in tshirts) {
        if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
          tshirts[item.title].color.push(item.color)
        }
        if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
          tshirts[item.title].size.push(item.size)
        }
        
      } else {
        tshirts[item.title] = JSON.parse(JSON.stringify(item))
        if (item.availableQty > 0) {
          tshirts[item.title].color = [item.color]
          tshirts[item.title].size = [item.size]
        }
        else{
          tshirts[item.title].color = []
          tshirts[item.title].size = []
        }
      }
    }
  return {
    props: {product: JSON.parse(JSON.stringify(tshirts)) }, 
  }
}
export default tshirts