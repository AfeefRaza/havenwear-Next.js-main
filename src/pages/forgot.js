import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'

const forgot = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const handleChange = async (e) =>{
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
  }
 
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
    router.query
  }, [])
  const resetPassword = async () => {
    if (password == cpassword) {
      
    
    const data = {
      password,
      sendMail: false

    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json();
    if (res.success) {
      console.log('Password has been reset')
    }
    else{
      console.log('error')
    }}

  }
  const sendResetemail = async () => {
    const data = {
      email,
      sendMail: true

    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json();
    if (res.success) {
      console.log('Reset email has been sent to your email')
    }
    else{
      console.log('error')
    }

  }
  return (
    <>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    
    <div>
      <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Log in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or   
         <Link href={"/login"} className="font-medium text-pink-600 hover:text-pink-500">  Login</Link>
      </p>
    </div>
    {router.query.token &&
    <>
    
    <div className="-space-y-px rounded-md shadow-sm">
      <div>
        <label htmlFor="password" className="sr-only">New Password</label>
        <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="New Password"/>
      </div>
      <div>
        <label htmlFor="cpassword" className="sr-only">Confirm NewPassword</label>
        <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="password" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Confirm NewPassword"/>
      </div>
      {password !== cpassword &&
      <div className='text-red-600'>
        Password dont match
      </div>
      }
      {password && password == cpassword &&
      <div className='text-green-600'>
        Password match
      </div>
      }
    </div>

    

    <div>
      <button onClick={resetPassword}  className="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
          </svg>
        </span>
        Continue
      </button>
    </div>
  </>
    }
    {!router.query.token &&
    <>
    
    <div className="-space-y-px rounded-md shadow-sm">
      <div>
        <label htmlFor="email-address" className="sr-only">Email address</label>
        <input value={email} onChange={handleChange} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
      </div>
      
    </div>

    

    <div>
      <button onClick={sendResetemail}  className="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
        </span>
        Continue
      </button>
    </div>
  </>
    }
    
  </div>
</div>
    </>
  )
}

export default forgot