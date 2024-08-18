
const handleBackSpace=(ctrl,words,curWord,curLetter)=>{

    console.log(ctrl,curWord)

    const invalidateLetter=(letter)=>{

        if(letter.classList.contains("extra"))
        {
            letter.parentNode?.removeChild(letter);
        }
        else if(letter.classList.contains('incorrect'))
        {
            letter.classList.remove('incorrect');
        }
        else if(letter.classList.contains('missed'))
        {
            letter.classList.remove('missed');
        }
        else
        {
            letter.classList.remove('correct');
        }
    }

    const invalidateWord=(word)=>{

        const correctLetters=[...word.querySelectorAll('.letter.correct')]
        const incorrectLetters=[...word.querySelectorAll('.letter.incorrect')]
        const missedLetters=[...word.querySelectorAll('.letter.missed')]
        const extraLetters=[...word.querySelectorAll('.letter.extra')]

        console.log(correctLetters,incorrectLetters,extraLetters,missedLetters);
        correctLetters.forEach((letter)=>{invalidateLetter(letter)})
        incorrectLetters.forEach((letter)=>{invalidateLetter(letter)})
        missedLetters.forEach((letter)=>{invalidateLetter(letter)})
        extraLetters.forEach((letter)=>{invalidateLetter(letter)})


        if(word?.classList?.contains('mistyped'))
        {
            word?.classList.remove('mistyped')
        }
        if(word?.classList?.contains('typed'))
        {
            word?.classList.remove('typed')
        }
    }


    if(ctrl)
    {
        if(curLetter&&curLetter===curWord.firstChild)
        {
            const prevWord=curWord.previousSibling;
            if(prevWord&&prevWord.classList.contains('mistyped'))
            {
                invalidateWord(prevWord);
                prevWord.classList.add('current');
                prevWord.firstChild.classList.add('current');
                curWord.classList.remove('current');
                curLetter.classList.remove('current');
            }
        }
        else
        {
            invalidateWord(curWord);
            curWord.firstChild.classList.add('current');
        }
    }
    else
    {
        if(!curLetter)
        {
            curWord.lastChild.classList.add('current');
            invalidateLetter(curWord.lastChild);
        }
        else if(curLetter===curWord.firstChild)
        {
            const prevWord=curWord.previousSibling;
            if(prevWord)
            {
                if(prevWord.classList.contains('typed'))
                {
                    return
                }
                else
                {
                    const missedLetters=[...prevWord.querySelectorAll('.letter.missed')];
                    // console.log(missedLetters);
                    if(missedLetters.length)
                    {
                        missedLetters[0].classList.add('current');
                        missedLetters.forEach((letter)=>{
                            invalidateLetter(letter)
                        })
                        
                    }
                    curLetter.classList.remove('current');
                    curWord.classList.remove('current');
                    prevWord?.classList.add('current');
                    prevWord?.classList.remove('mistyped');
                }
                
            }
        }
        else 
        {
            curLetter.classList.remove('current');
            curLetter.previousSibling.classList.add('current');
            invalidateLetter(curLetter.previousSibling);
        }
    }

}


export default handleBackSpace;