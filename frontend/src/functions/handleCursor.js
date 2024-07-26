

const handleCursor = (cursor,words)=>{

    const nextWord=words.current?.querySelector('.word.current')
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
        cursor.current.style.left=`${(words.current.lastChild.getBoundingClientRect().right/16)}rem`
        cursor.current.style.top=`${(words.current.lastChild.getBoundingClientRect().top/16)}rem`
    }
}

export default handleCursor;
