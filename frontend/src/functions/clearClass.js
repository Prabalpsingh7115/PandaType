

const clearClass=(para,clock)=>{

    const removeClass=(classlist,classkey)=>{
        classlist.forEach((element) => {
            element.classList?.remove(classkey);
        });
    }

    if(clock.current?.classList?.contains("incorrect"))
    {
        clock.current.classList.remove("incorrect");
    }

    para.current.style.marginTop="0rem"
    const correctLetters=[...para.current.querySelectorAll('.letter.correct')]
    const incorrectLetters=[...para.current.querySelectorAll('.letter.incorrect')]
    const currentElements=[...para.current.querySelectorAll('.current')]
    const typedwords=[...para.current.querySelectorAll(".word.typed")]
    const mistypedwords=[...para.current.querySelectorAll(".word.mistyped")]

    removeClass(correctLetters,'correct');
    removeClass(incorrectLetters,'incorrect');
    removeClass(currentElements,'current');
    removeClass(typedwords,'typed');
    removeClass(mistypedwords,'mistyped');

    const extraLetters=[...para.current.querySelectorAll('.extra')]
    // console.log(extraLetters);
    
    extraLetters.forEach((letter)=>{
        letter.parentNode.removeChild(letter);
    })

    const curWord=para.current.querySelector('.word');
    curWord?.classList.add('current');
    curWord?.firstChild.classList.add('current');
}

export default clearClass;