import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {name,email,password}
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    } )
    const response = await res.json()
    
    setEmail('')
    setName('')
    setPassword('')
    toast.success('Your account has been created', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  return (
    <>
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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or   
        <Link href={"/login"} className="font-medium text-pink-600 hover:text-pink-500">  Login</Link>
      </p>
    </div>
    <form  className="mt-8 space-y-6"  method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="name" className="sr-only">Name</label>
          <input value={name} onChange={(e)=>{ setName(e.target.value) }} id="name" name="name" type="email" autocomplete="email" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Your Name"/>
        </div>
        <div>
          <label for="email" className="sr-only">Email address</label>
          <input value={email} onChange={(e)=>{ setEmail(e.target.value) }} id="email" name="email" type="email" autocomplete="email" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
        </div>
        <div>
          <label for="password" className="sr-only">Password</label>
           <input value={password} onChange={(e)=>{ setPassword(e.target.value) }} id="password" name="password" type="password" autocomplete="current-password" required className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Password"/>
        </div>
      </div>

      

      <div>
        <button onClick={handleSubmit} className="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default signup