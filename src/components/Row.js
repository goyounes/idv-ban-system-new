import React, { useState } from "react";
import Picture from "./Picture";
import "../App.css";

function Row(props) {
  const [reset,setReset] = useState(false)
  const handleRightClick = (e)=>{
    e.preventDefault();
    console.log("Right Click on Row, Images will be restored")
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 0);
  }
  return (
      <div onContextMenu={handleRightClick} style={{bottom}}>
        {props.pictures.filter((picture) => picture.type === props.type).map((picture) => {
          return <Picture
                  url={picture.url} 
                  key={picture.id} 
                  id={picture.id} 
                  globalList={props.globalList}
                  needUpdate={props.needUpdate}
                  update={props.update}
                  container="book"
                  reset={reset}
                />;
        })}
    </div>
  );
}

export default Row;