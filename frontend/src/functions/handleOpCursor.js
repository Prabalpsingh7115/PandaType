

const handleCursor = (x,y)=>{

    x=parseInt(x);
    y=parseInt(y)
    // console.log(x,y)

    const cursor=document.querySelector('.op-cursor')
    // console.log(cursor)
    
    const Words=[...document.querySelectorAll('.words')[0].children]
    const curWord=x>=0&&x<Words.length?Words[x]:null
    const curLetter=y!=-1 ? curWord?.children[y] : null;

    // console.log(Words)
    // console.log(curWord)
    // console.log(curLetter)


    if(curLetter)
    {
        cursor.style.left=`${(curLetter.getBoundingClientRect().left/16)}rem`
        cursor.style.top=`${(curLetter.getBoundingClientRect().top/16)}rem`
    }
    else if(curWord)
    {
        cursor.style.left=`${(curWord.getBoundingClientRect().right/16)}rem`
        cursor.style.top=`${(curWord.getBoundingClientRect().top/16)}rem`
    }
    else
    {
        cursor.style.left=`${(Words[0].getBoundingClientRect().left/16)}rem`
        cursor.style.top=`${(Words[0].getBoundingClientRect().top/16)}rem`
    }
}

export default handleCursor;
