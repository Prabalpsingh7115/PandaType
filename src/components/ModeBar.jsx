/* eslint-disable react-hooks/exhaustive-deps */
import getSubModes from "../functions/getSubModes";
import { useEffect} from "react";


const ModeBar = ({mode,setMode,subModes,setSubModes,subMode,setSubMode,}) =>{

    useEffect(()=>{
        const fetchSubModes=async()=>{
            const submodes=getSubModes({mode})
            setSubModes(submodes);
        }
        fetchSubModes();
    },[mode])

    useEffect(()=>{
        setSubMode(subModes[0]);
    },[subModes])

    

    return (
        <div>
            <div className={"flex flex-row justify-center gap-10 text-3xl p-5 mt-2 bg-transparent"}>
                <div className="mode flex flex-row gap-5">
                    <div className={`${mode==='time'?"underline text-gray-500 ":""}flex hover:underline hover:underline-offset-6 cursor-pointer`} 
                        onClick={()=>{setMode("time")}}>Time</div>
                    <div className={`${mode==='words'?"underline text-gray-500 ":""}flex hover:underline hover:underline-offset-6 cursor-pointer`} onClick={()=>{setMode("words")
                    }}>Words</div>
                </div>
                <p>|</p>
                <div className="len flex flex-row gap-5">
                    {subModes.map((submode)=>(
                        <div className={`${submode==subMode?"text-gray-500 underline":""} flex hover:underline underline-offset-6 cursor-pointer`} key={submode} onClick={()=>{setSubMode(submode)}}>{submode}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModeBar;