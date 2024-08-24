

const clearClass=()=>{

    const removeClass=(classlist,classkey)=>{
        classlist.forEach((element) => {
            element.classList?.remove(classkey);
        });
    }

    const clock=document.querySelector('.clock')

    if(clock.classList.contains("incorrect"))
    {
        clock.classList.remove("incorrect");
    }

    // console.log(document.querySelector('.words'))
    


    const correctLetters=[...document.querySelectorAll('.letter.correct')]
    const incorrectLetters=[...document.querySelectorAll('.letter.incorrect')]
    const missedLetters=[...document.querySelectorAll('.letter.missed')]
    const currentElements=[...document.querySelectorAll('.current')]
    const typedwords=[...document.querySelectorAll(".word.typed")]
    const mistypedwords=[...document.querySelectorAll(".word.mistyped")]

    removeClass(correctLetters,'correct');
    removeClass(incorrectLetters,'incorrect');
    removeClass(missedLetters,'missed');
    removeClass(currentElements,'current');
    removeClass(typedwords,'typed');
    removeClass(mistypedwords,'mistyped');

    const extraLetters=[...document.querySelectorAll('.extra')]
    // console.log(extraLetters);
    
    extraLetters.forEach((letter)=>{
        letter.parentNode.removeChild(letter);
    })

    const curWord=document.querySelector('.word');
    curWord?.classList.add('current');
    curWord?.firstChild.classList.add('current');
}

export default clearClass;