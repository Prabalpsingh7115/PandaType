

const handleSpace=(curWord,curLetter,expectedLetter)=>{
    if(expectedLetter!==' ')
    {
        const skippedLetters=[...curWord.querySelectorAll('.current.word .letter:not(.correct)')];
        // console.log(skippedLetters)

        skippedLetters.forEach((letter)=>{
            letter.classList.add("incorrect");
        })
    }

    curWord.nextSibling?.classList.add("current");
    curWord.nextSibling?.firstChild.classList.add("current");
    curWord.classList.remove("current");
    curLetter?.classList.remove("current");
}

export default handleSpace;