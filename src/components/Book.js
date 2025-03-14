import React, { useState,useEffect } from "react";
import HunterBook from "./HunterBook";
import SurvivorBook from "./SurvivorBook";

function Book(props) {
    const [book, setBook] = useState(1);

    const toggleBook = (e) => {
      const x = book === 1 ? 2:1
      setBook(x);
      props.globalList.bookState = x
    };
  
    const closeBook = (e) => {
      setBook(0);
      props.globalList.bookState = 0
      props.globalList.bigMap = true
      props.update()
    };
  
    const openBook = (e) => {
      setBook(1);
      props.globalList.bookState = 1
    }
    if (props.globalList.bookShouldToggle === true){
      toggleBook()
      delete props.globalList.bookShouldToggle;
    }
    if (props.globalList.bookShouldClose === true){
      // setTimeout(() => {
        setBook(0);
        props.globalList.bookState = 0
        props.update()
      // }, 10);
      delete props.globalList.bookShouldClose;
    }
    const visible = {
        "height": "960px",
        "width":"630px",
        "visibility": "initial",        
    }
    
    const hidden = {
        "height": "0px",
        "width":"0px",
        "visibility": "hidden",        
    }

    useEffect(() => {
       const handleArrowKey = (e) => {
        if (e.keyCode === 39 || e.keyCode === 68)  openBook();
        if (e.keyCode === 37 || e.keyCode === 81 || e.keyCode === 77 || e.keyCode === 65)  closeBook();
        if (e.keyCode === 38 || e.keyCode === 90)  setBook(1);
        if (e.keyCode === 40 || e.keyCode === 83)  setBook(2);
      };
      window.addEventListener('keydown', handleArrowKey);

      return () => {
        window.removeEventListener('keydown', handleArrowKey);
      };

    // eslint-disable-next-line
    }, []);

    return (
        <div>
          <SurvivorBook 
            bookStyle={book === 1 ? visible : hidden} 
            PictureList={props.PictureList} 
            globalList={props.globalList}
            needUpdate={props.needUpdate}
            update={props.update} 
            type="book" 
          />
          <HunterBook 
            bookStyle={book === 2 ? visible : hidden} 
            PictureList={props.PictureList} 
            globalList={props.globalList}
            needUpdate={props.needUpdate}
            update={props.update}
            type="book" 
          />
          <div style={{display: "flex", justifyContent: "space-between",}}>
          {book !== 0 && <button onClick={toggleBook} style={{border:"3px solid", height: '50px', width : '300px',fontSize:"40px"}}>Switch Book ⇔</button>}
          {book !== 0 && <button onClick={closeBook}  style={{border:"3px solid", height: '50px', width : '200px',fontSize:"40px"}}>Close ⇦</button>}
          {/* {book === 0 && <button onClick={openBook}   style={{border:"3px solid", height: '50px', width : '200px',fontSize:"40px",marginTop:"89.35vh",position:"absolute"}}>Open ⇨</button>} */}
          </div>
    </div>
    )
}

export default Book;