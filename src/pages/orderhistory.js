import React, { useEffect ,useState } from 'react'
import Link from 'next/link'

const orderhistory = () => {
    const [order, setOrder] = useState([])
    useEffect(() => {
    
        const fetchOrders = async () => {
         let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`,{
           method:'POST',
           headers:{
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({token: JSON.parse(localStorage.getItem('myuser')).token}),
         })
         let res = await a.json();
         setOrder(res.orders)
          
        }
        if (!localStorage.getItem('myuser')) {
         Router.push('/')
         
        }
        else{
         fetchOrders()
        }
         
       }, [])
       console.log(order)
  return (
    <div> <div className='min-h-screen'>
    <h1 className='text-3xl text-center'>My Orders</h1>
    <div class="flex flex-col">
<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
  <div class="overflow-hidden">
    <table class="min-w-full text-left text-sm font-light">
      <thead class="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" class="px-6 py-4">id</th>
          <th scope="col" class="px-6 py-4">Email</th>
          <th scope="col" class="px-6 py-4">amount</th>
          <th scope="col" class="px-6 py-4">Details</th>
        </tr>
      </thead>
      <tbody>
        {order.map((item)=>{
            return<tr key={item.orderId}
          class="border-b transition duration-300 ease-in-out hover:bg-pink-100 dark:border-neutral-500 dark:hover:bg-bg-pink-100">
          <td class="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
          <td class="whitespace-nowrap px-6 py-4">{item.email}</td>
          <td class="whitespace-nowrap px-6 py-4">{item.amount} PKR</td>
          <td class="whitespace-nowrap px-6 py-4"> <Link href={'/receipt?id=' + item._id}> Details</Link> </td>
        </tr>
        })}
        
        
      </tbody>
    </table>
  </div>
</div>
</div>
</div>
</div></div>
  )
}

export default orderhistory