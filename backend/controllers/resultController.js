import User from "../model/User.js";

const handleResult=async(req,res)=>{
    const {username,result}=req.body
    console.log(result)

    if(!result)
    {
        return res.status(400).json({'message':'Error Saving Result'})
    }

    if(!username)
    {
        return res.status(400).json({'message':'No Username'})
    }

    const foundUser =await User.findOne({username}).exec();

    if(!foundUser)
    {
        return res.status(403).json({'message':'No User found!'})
    }

    if(result.type==='practice')
    {
        if(result.mode==='time')
        {
            if(result.submode===15)
            {
                if(foundUser.records.modeTime.fifteen.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeTime.fifteen.wpm=parseInt(result.WPM);
                    foundUser.records.modeTime.fifteen.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeTime.fifteen.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeTime.fifteen.accuracy=max(foundUser.records.modeTime.fifteen.accuracy,parseInt(result.accuracy));
                }
            }
            else if(result.submode===30)
            {
                if(foundUser.records.modeTime.thirty.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeTime.thirty.wpm=parseInt(result.WPM);
                    foundUser.records.modeTime.thirty.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeTime.thirty.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeTime.thirty.accuracy=max(foundUser.records.modeTime.thirty.accuracy,parseInt(result.accuracy));
                }
            }
            else if(result.submode===60)
            {
                if(foundUser.records.modeTime.sixty.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeTime.sixty.wpm=parseInt(result.WPM);
                    foundUser.records.modeTime.sixty.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeTime.sixty.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeTime.sixty.accuracy=max(foundUser.records.modeTime.sixty.accuracy,parseInt(result.accuracy));
                }
            }
            else
            {
                if(foundUser.records.modeTime.onetwenty.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeTime.onetwenty.wpm=parseInt(result.WPM);
                    foundUser.records.modeTime.onetwenty.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeTime.onetwenty.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeTime.onetwenty.accuracy=max(foundUser.records.modeTime.onetwenty.accuracy,parseInt(result.accuracy));
                }
            }
            foundUser.tests.tpractices+=1;
        }
        else
        {
            if(result.submode===20)
            {
                if(foundUser.records.modeWords.twenty.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeWords.twenty.wpm=parseInt(result.WPM);
                    foundUser.records.modeWords.twenty.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeWords.twenty.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeWords.twenty.accuracy=max(foundUser.records.modeWords.twenty.accuracy,parseInt(result.accuracy));
                }
            }
            else if(result.submode===50)
            {
                if(foundUser.records.modeWords.fifty.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeWords.fifty.wpm=parseInt(result.WPM);
                    foundUser.records.modeWords.fifty.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeWords.fifty.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeWords.fifty.accuracy=max(foundUser.records.modeWords.fifty.accuracy,parseInt(result.accuracy));
                }
            }
            else if(result.submode===70)
            {
                if(foundUser.records.modeWords.seventy.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeWords.seventy.wpm=parseInt(result.WPM);
                    foundUser.records.modeWords.seventy.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeWords.seventy.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeWords.seventy.accuracy=max(foundUser.records.modeWords.seventy.accuracy,parseInt(result.accuracy));
                }
            }
            else
            {
                if(foundUser.records.modeWords.hundred.wpm<parseInt(result.WPM))
                {
                    foundUser.records.modeWords.hundred.wpm=parseInt(result.WPM);
                    foundUser.records.modeWords.hundred.accuracy=parseInt(result.accuracy);
                }
                else if(foundUser.records.modeWords.hundred.wpm===parseInt(result.WPM))
                {
                    foundUser.records.modeWords.hundred.accuracy=max(foundUser.records.modeWords.hundred.accuracy,parseInt(result.accuracy));
                }
            }
        }
    }
    else
    {
        foundUser.tests.tchallenges+=1;
    }
    foundUser.tests.ttime+=parseInt(result.time);
    

    await foundUser.save();
    return res.status(200).json({'message':'Result Save Success'}) 



}

export default handleResult;