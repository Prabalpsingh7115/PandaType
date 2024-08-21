const delay = (time)=>{
    return new Promise(resolve => setTimeout(resolve, time));
} 

export default delay