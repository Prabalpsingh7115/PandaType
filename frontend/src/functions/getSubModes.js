const GetSubModes = ({mode}) =>{
 
    if(mode==="time")
    {
        return [15,30,60,120];
    }
    else if(mode==="words")
    {
        return [20,50,70,100];
    }
    else
    {
        return []
    }

}

export default GetSubModes;