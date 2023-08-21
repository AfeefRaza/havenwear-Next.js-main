import React, {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const myaccount = () => {
    const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [oldpassword, setOldpassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  // const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value:null})
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
  if (myuser && myuser.token) {
    setUser(myuser)
    setEmail(myuser.email)
    fetchData(myuser.token)
    
  }
  }, [])
    const handleChange = async (e) =>{
        if (e.target.name == 'name') {
          setName(e.target.value)
        }
        else if (e.target.name == 'address') {
          setAddress(e.target.value)
        }
        else if (e.target.name == 'password') {
          setPassword(e.target.value)
        }
        else if (e.target.name == 'oldpassword') {
          setOldpassword(e.target.value)
        }
        else if (e.target.name == 'cpassword') {
          setCpassword(e.target.value)
        }
        else if (e.target.name == 'pincode') {
    
          setPincode(e.target.value)
          
        
        }
        else if (e.target.name == 'number') {
          setNumber(e.target.value)
        }
        
        
          // if (email.length>3 && name.length>3 && address.length>3 && pincode.length>3 && number.length>3) {
          //   setDisabled(false)
            
          // } 
          // else {
          //   setDisabled(true)
          // }
        
        
      }
      const fetchData = async (token) => {
        const data = {token: token}
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let res = await a.json()
       
        setName(res.name)
        setAddress(res.address)
        setPincode(res.pincode)
        setNumber(res.number)
      }
      const handleUserSubmit = async () => {
        const data = {token: user.token ,address, name, pincode,number}
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let d = await a.json()
        
        if (res.success) {
          toast.success('Your Information has been successfully updated', {
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
        else{
          toast.error('Something Went wrong', {
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
        
        
      }
      const handlePasswordSubmit = async () => {
        let res;
        if (password == cpassword) {
          const data = {token: user.token ,password,oldpassword,cpassword}
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
         res = await a.json()
        
        
        }
        else{
          res = {success:false}
        }
        if (res.success) {
          toast.success('Your Password has been successfully updated', {
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
        else{
          toast.error('Something Went wrong', {
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
    <div className=" min-h-screen pt-2 font-mono my-16">
        <h1 className='text-center text-3xl font-bold'>MY ACCOUNT</h1>
        <div className="container mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
                <h2 className="text-2xl text-gray-900">Account Setting</h2>
                <div className="mt-6 border-t border-pink-400 pt-4">
                    <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='oldpassword'>Old Password</label>
                            <input onChange={handleChange} value={oldpassword} className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 mb-6' id='oldpassword' name='oldpassword' type='text' placeholder='Enter your Old Password'  />
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='password'>Password</label>
                            <input onChange={handleChange} value={password} className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 mb-6' id='password' name='password' type='text' placeholder='Enter your New Password'  />
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='cpassword'>Confirm Password</label>
                            <input onChange={handleChange} value={cpassword} className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500 mb-6' id='cpassword'  name='cpassword' type='text' placeholder='Confirm your Password'  />
                            <div className="flex justify-end">
                                <button onClick={handlePasswordSubmit}  className="appearance-none bg-pink-400 text-white px-2 py-1 shadow-sm border border-pink-600 rounded-md mr-3" >Save Password</button>
                            </div>
                        </div>
                        
                        
                        
                        <div className="personal w-full border-t border-pink-400 pt-4">
                            <h2 className="text-2xl text-gray-900">Delivery Details</h2>
                            <div className="flex items-center justify-between mt-4">
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='name' >Name</label>
                                    <input onChange={handleChange} value={name} id='name' name='name' className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  />
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='email' >Email</label>
                                    <input onChange={handleChange} value={email} id='email' name='email' className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  />
                                </div>
                                
                            </div>
                            
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label htmlFor='address' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Address</label>
                                <textarea onChange={handleChange} value={address} id='address' name='address' className='bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-pink-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'  ></textarea>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='number' >Number</label>
                                    <input onChange={handleChange} value={number} id='number' name='number' className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  />
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='pincode' >Pincode</label>
                                    <input onChange={handleChange} value={pincode} id='pincode' name='pincode' className='appearance-none block w-full bg-white text-gray-700 border border-pink-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  />
                                </div>
                                
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleUserSubmit} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-pink-400 rounded-md mr-3" >save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default myaccount