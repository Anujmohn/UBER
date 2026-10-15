import {Link} from "react-router-dom"
import React, { useState } from 'react'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const[password,setPassword] =useState('');
    const[userData, setUserData]= useState({})

    const submitHandler=(e)=>{
        setUserData({
            email:email,
            password:password
        })
        console.log(userData)
        setEmail('')
        setPassword('')
    }

    return (
        <div className= "p-7 h-screen flex flex-col justify-between">
            
            <div>
                <h1 className="text-2xl font-bold mb-7 text-black">Yoo</h1>

                <form onSubmit={submitHandler}>
                <h3 className='text-lg mb-2 font-medium'>Enter Your Email</h3>
                <input 
                    value={email} 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    className ="bg-[#eeeeee] rounded px-3 py-2 border w-full text-lg placeholder:text-base mb-4"
                    required
                    type='email'
                    placeholder="example@email.com"/>
                
                
                <h3  className='text-lg mb-2 font-medium'>Enter Password</h3>
                <input
                    value={password} 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    className =" mb-4 bg-[#eeeeee] rounded px-3 py-2 border w-full text-lg placeholder:text-base" 
                    required 
                    type="password" 
                    placeholder="password"/>
                
                
                <button  className ="mb-4 mt-4 text-white bg-black rounded px-3 py-2 border w-full text-lg placeholder:text-white" >Login</button>
            
            </form>  

                <p className= 'text-center font-medium'> New here?<Link to='/UserSignup' className= "text-blue-600"> Create new Account</Link></p>
            
            </div>

            <div>
                <Link to='/CaptainLogin' className= "text-ehite-600  mt-2 text-white bg-[#26bc85] flex itex justify-center rounded px-3 py-2 border w-full text-lg placeholder:text-base">Sign in as Captain</Link>
            </div>

        </div>
    )
}

export default UserLogin