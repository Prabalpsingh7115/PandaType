const scrollLines=()=>{
    const container=document.querySelector('.container')
    const words=document.querySelector('.words')
    const curWord=document.querySelector('.word.current')


    
    const lastWordBottom = parseInt(
        curWord.lastChild.getBoundingClientRect().bottom,
      );
  
      const containerTop = parseInt(
        container.getBoundingClientRect().top,
      );

      
      const containerBottom = parseInt(
        container.getBoundingClientRect().bottom,
      );
      
      const curLineTop = parseInt(
        curWord?.getBoundingClientRect().top ||
        container.getBoundingClientRect().top,
      );
      
      const curMargin = parseInt(words.style.marginTop)||0;
      if (lastWordBottom+40> containerBottom&&curLineTop>containerTop) {
        let newMargin=curMargin-46
        console.log(newMargin,curMargin)
        console.log(typeof(newMargin),typeof(curMargin))
        words.style.marginTop = `${newMargin}px`; 
        console.log(words.style.marginTop)
      }
}

export default scrollLines;