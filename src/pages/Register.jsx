import { useState } from 'react'
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import registerImage from '../assets/images/panda-bgg.jpeg' 
import userIcon from '../assets/icons/user-icon.png'
import emailIcon from '../assets/icons/email-icon.png'
import pwdIcon from '../assets/icons/pwd-icon.png'
import pandaIcon from '../assets/icons/panda-icon.png'


const Register = () => {

    const [name,setName]=useState("");
    // const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-repeat  bg-center" style={{ backgroundImage: `url(${registerImage})` }}>
            <div className='flex flex-col gap-4 justify-center items-center  text-black text-2xl border-2 p-14 py-8 mt-2 border-solid border-slate-300 rounded-xl bg-green-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90'>
                <Link to="/">
                    <div className='flex w-full  h- justify-center font-bold items-center py-3'>
                        <img src={pandaIcon} alt="panda-icon" className='w-16 h-16'/>
                        <span>
                            PandaType
                        </span>
                    </div>
                </Link>
                <h2 className='text-2xl'>Register</h2>
                <div className='flex flex-row gap-3'>
                    <img src={userIcon} alt="name-icon" className='w-12'/>
                    <input type="text" name="name" value={name} placeholder='Name' onChange={(e)=>{setName(e.target.value)}} className='px-3 py-2 rounded-lg'/>
                </div>
                <div className='flex flex-row gap-3'>
                    <img src={emailIcon} alt="email-icon" className='w-12'/>
                    <input type="text" name="email" value={email} placeholder='Email Id' onChange={(e)=>{setEmail(e.target.value)}} className='px-3 py-2 rounded-lg'/>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-1'>
                        <img src={pwdIcon} alt="password-icon" className='w-12'/>
                        <input type="password" name="password" value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className='px-3 py-2 rounded-lg'/>
                    </div>
                    <span className='text-base pl-14'> Already have an account? <Link to="/login" className="hover:text-blue-500"> Login </Link></span>
                </div>

                <button className='flex px-12 bg-slate-200 py-1 shadow-md  hover:shadow-xl rounded-md'>
                    Register
                </button>

                <hr className='border-t-2 border-slate-300 w-1/2 mx-auto my-4' />
                <div>
                    <GoogleLogin />
                </div>
            </div>
        </div>
    )
}

export default Register