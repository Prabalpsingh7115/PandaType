
import GetParagraph from "../functions/getParagraph.js";

const getPara = (req,res)=>{
    let{mode,submode}=req.query
    const curPara=GetParagraph(mode,submode);
    return res.status(200).json({'para':curPara});
}

export default getPara;