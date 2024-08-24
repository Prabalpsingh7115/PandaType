

const handleSpace=()=>{

    const curWord=document.querySelector('.word.current');
    const curLetter=document.querySelector('.letter.current');
    const expectedLetter=curLetter?.innerText||' ';

    if(!curWord||curLetter===curWord.firstChild)
    {
        return;
    }

    if(expectedLetter!==' ')
    {
        const skippedLetters=[...curWord.querySelectorAll('.current.word > .letter:not(.correct):not(.incorrect')];
        // console.log(skippedLetters)

        skippedLetters.forEach((letter)=>{
            letter.classList.add("missed");
        })
    }

    const correctLetters=curWord?.querySelectorAll('.current.word > .letter.correct');

    if(correctLetters?.length===curWord?.children.length)
    {
        curWord?.classList.add("typed");
    }
    else
    {
        curWord?.classList.add("mistyped");
    }

    // console.log(curWord,curWord.nextSibling)

    curWord?.nextSibling?.classList.add("current");
    curWord?.nextSibling?.firstChild.classList.add("current");
    curWord?.classList.remove("current");
    curLetter?.classList.remove("current");
}

export default handleSpace;