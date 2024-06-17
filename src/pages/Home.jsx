import {Link} from 'react-router-dom'
import { useState } from 'react'

import ModeBar from '../components/ModeBar'
import TypingArena from '../components/TypingArena'

import pandaIcon from '../assets/icons/panda-icon.png'

const Home = () => {

    const [mode,setMode] =useState("time");
    const [subModes,setSubModes] =useState([15,30,60,120]);
    const [subMode,setSubMode] =useState(subModes[0]);

    return (
        <div className='flex w-full h-screen flex-col overflow-hidden font-customFont  items-center'>
            <div className='flex w-full h-auto text-white justify-between items-center px-10 py-5' >
                <Link to="/">
                    <div className='flex justify-center items-center'>
                        <img src={pandaIcon} alt="panda-icon" className='invert w-16 h-16 '/>
                        <span>
                            PandaType
                        </span>
                    </div>
                </Link>
                <div className='login register text-3xl flex gap-2'>
                    <Link to="/login">Login </Link>
                    <span> / </span> 
                    <Link to="/register">Register</Link>
                </div>
            </div>
            <ModeBar 
                mode={mode}
                setMode={setMode}
                subMode={subMode}
                setSubMode={setSubMode}
                subModes={subModes}
                setSubModes={setSubModes}
            />
            <TypingArena
                mode={mode}
                value={subMode}
            />
        </div>
    )
}

export default Home