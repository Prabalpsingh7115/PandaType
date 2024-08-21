
import GetParagraph from "../functions/getParagraph.js";

const getPara = async(req,res)=>{

    let {mode,submode}=req.body

    if(!mode)
    {
        mode='time';
    }

    const curPara=await GetParagraph(mode,submode);
    return res.status(200).json({'para':curPara});
}

export default getPara;