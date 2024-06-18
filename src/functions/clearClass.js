

const clearClass=(para)=>{

    const removeClass=(classlist,classkey)=>{
        classlist.forEach((element) => {
            element.classList?.remove(classkey);
        });
    }

    para.current.style.marginTop="0rem"
    const correctLetters=[...para.current.querySelectorAll('.letter.correct')]
    const incorrectLetters=[...para.current.querySelectorAll('.letter.incorrect')]
    const currentElements=[...para.current.querySelectorAll('.current')]

    removeClass(correctLetters,'correct');
    removeClass(incorrectLetters,'incorrect');
    removeClass(currentElements,'current');

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