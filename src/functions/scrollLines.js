const scrollLines=(container, words, curWord)=>{
    const lastWordBottom = parseInt(
        words.current.lastChild.getBoundingClientRect().bottom,
      );
  
      const containerTop = parseInt(
        container.current.getBoundingClientRect().top,
      );
  
      const containerBottom = parseInt(
        container.current.getBoundingClientRect().bottom,
      );
  
      const curLineTop = parseInt(
        curWord?.getBoundingClientRect().top ||
          container.current.getBoundingClientRect().top,
      );
      const curMargin = parseInt(words.current.style.marginTop);
      if (lastWordBottom > containerBottom && curLineTop > containerTop) {
        words.current.style.marginTop = `${curMargin - 36}px`;
      }
}

export default scrollLines;