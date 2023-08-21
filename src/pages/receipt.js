import React from 'react'
import Order from '../../models/order';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';


const orders =  ({orders}) => {
  const products = orders.products;
  // const router = useRouter
  // const {id} = router.query
  
  
  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex justify-center">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">HavenWear</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order no# {orders.orderId}</h1>
        
        <p className="leading-relaxed mb-4">Your order will be delivered withing 5-7 days</p>
        <div className="flex  py-2">
          <span className="text-gray-900 font-bold text-xl">Item</span>
          <span className="ml-auto text-gray-900 font-bold text-xl">Quantity</span>
          <span className="ml-auto text-gray-900 font-bold text-xl">Price</span>
        </div>
        {Object.keys(products).map((item)=>{
          return <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">{products[item].name.slice(0,10)}...({products[item].size}/{products[item].variant})</span>
          <span className="ml-auto text-gray-900">{products[item].qty}</span>
          <span className="ml-auto text-gray-900">Rs.{products[item].price}</span>
        </div>
        })}
        
        
        
        <div className="flex my-5">
          <span className="title-font font-medium text-2xl text-gray-900">Subtotal: 549Pkr</span>
          <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track your Order</button>
          
        </div>
      </div>
      
    </div>
  </div>
</section>
    </>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  
}


  let orders = await Order.findById(context.query.id)
 
  return {
    props: {orders: JSON.parse(JSON.stringify(orders)) }, 
  }
}

export default orders