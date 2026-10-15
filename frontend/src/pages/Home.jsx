import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
    return (
        <div
            className=" bg-cover bg-[url('https://t3.ftcdn.net/jpg/00/62/20/74/240_F_62207459_cL5wYDLWzTYwhXps8bC1N5za9YA0CmEf.jpg')] h-screen bg-cover bg-center flex flex-col justify-between">
            <h1 className="text-4xl font-bold px-5 pt-8 text-black">Yoo</h1>
            <div className="relative bg-white pb-7 py-5 px-10 overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                    src="https://i.redd.it/zegv8g6fw3he1.gif"
                    alt=""/>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold"> Get Start with Us</h2>
                    <Link to="/UserLogin" className="flex justify-center items-center  w-full bg-black text-white py-3 text-xl rounded mt-3"> Let's Go </Link>
                </div>
            </div>
        </div>
    )
}

export default Home