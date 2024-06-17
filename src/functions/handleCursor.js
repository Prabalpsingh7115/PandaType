

const handleCursor = (cursor,para)=>{

    const nextWord=para.current?.querySelector('.word.current')
    const nextLetter=nextWord?.querySelector('.letter.current')
    // console.log(nextWord)
    // console.log(nextLetter)

    if(!nextWord && !nextLetter)
    {
        return;
    }

    if(nextLetter)
    {
        cursor.current.style.left=`${nextLetter.getBoundingClientRect().left-1}px`
        cursor.current.style.top=`${nextLetter.getBoundingClientRect().top}px`
    }
    else if(nextWord)
    {
        cursor.current.style.left=`${nextWord.getBoundingClientRect().right}px`
        cursor.current.style.top=`${nextWord.getBoundingClientRect().top+2}px`
    }
    else
    {
        cursor.current.style.left=`78px`
    }
}

export default handleCursor;
