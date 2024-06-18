

const handleCursor = (cursor,para)=>{

    const nextWord=para.current?.querySelector('.word.current')
    const nextLetter=nextWord?.querySelector('.letter.current')
    // console.log(nextWord)
    // console.log(nextLetter)

    if(nextLetter)
    {
        cursor.current.style.left=`${(nextLetter.getBoundingClientRect().left/16)}rem`
        cursor.current.style.top=`${(nextLetter.getBoundingClientRect().top/16)}rem`
    }
    else if(nextWord)
    {
        cursor.current.style.left=`${(nextWord.getBoundingClientRect().right/16)}rem`
        cursor.current.style.top=`${(nextWord.getBoundingClientRect().top/16)}rem`
    }
    else
    {
        cursor.current.style.left=`${(para.current.lastChild.getBoundingClientRect().right/16)}rem`
        cursor.current.style.top=`${(para.current.lastChild.getBoundingClientRect().top/16)}rem`
    }
}

export default handleCursor;
