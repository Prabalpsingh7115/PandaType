import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import pandaImage from '../assets/images/panda-bgg.jpeg'
import emailIcon from '../assets/icons/email-icon.png'
import pwdIcon from '../assets/icons/pwd-icon.png'
import pandaIcon from '../assets/icons/panda-icon.png'
import { Link } from 'react-router-dom';


const Login =()=>{

    const [userEmail,setUserEmail]=useState();
    const [password,setPassword]=useState();

    return (
        <div className="flex h-screen w-full flex-col text-black md:flex-row items-center justify-center p-2 md:p-0 bg-repeat bg-center" style={{ backgroundImage: `url(${pandaImage})` }}>
            <div className='login flex flex-col justify-center items-center text-2xl gap-4 p-10 py-8 border-solid border-2 border-slate-300 rounded-xl bg-green-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90'>
                <Link to="/">
                    <div className='flex w-full  h- justify-center font-semibold items-center py-3'>
                        <img src={pandaIcon} alt="panda-icon" className='w-16 h-16'/>
                        <span>
                            PandaType
                        </span>
                    </div>
                </Link>
                <h2 className='text-2xl'>Login</h2>
                <div className='flex w-full items-center justify-center gap-3'>
                    <img src={emailIcon} alt="email-icon" className='w-12'/>
                    <input className="flex border-2 rounded-lg px-3 py-2 text-2xl" type="email" required name="useremail" value={userEmail} placeholder='Email Id' 
                        onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
                <div>
                    <div className='flex w-full items-center justify-center gap-3'>
                        <img src={pwdIcon} alt="password-icon" className='w-12'/>
                        <input className="flex border-2 rounded-lg px-3 py-2 text-2xl" required  type="password" name="password" value={password} placeholder='Password' 
                            onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <span className='text-base relative left-16'>Don&apos;t have an account? <Link to="/register" className='hover:underline hover:text-blue-800'> Register</Link></span>
                </div>
                <div className='py-2'>
                    <button type="button" className=' flex px-12 bg-slate-200 py-1 shadow-md  hover:shadow-xl rounded-md' >Sign In</button>
                </div>
                <hr className='border-t-2 border-slate-300 w-1/2 mx-auto my-4' />
                <div>
                    <GoogleLogin />
                </div>
            </div>
        </div>
    )

}

export default Login 