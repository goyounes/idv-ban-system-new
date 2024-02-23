import React from "react";
import Picture from "./Picture";
import "../App.css";

function Row(props) {
  const handleRightClick = (e)=>{
    e.preventDefault();
    console.log("Right Click on Row, Images will be restored")

    props.pictures.filter((picture) => picture.type === props.type).map((picture) => {
      return  props.globalList.removeIgnoredHunter(picture.id)
    })
    props.update();
  }

  return (
      <div onContextMenu={handleRightClick}>
        {props.pictures.filter((picture) => picture.type === props.type).map((picture) => {
          return <Picture
                  url={picture.url} 
                  key={picture.id} 
                  id={picture.id} 
                  globalList={props.globalList}
                  needUpdate={props.needUpdate}
                  update={props.update}
                  container="book"
                />;
        })}
    </div>
  );
}

export default Row;