import React from "react";
import PictureP from "./PictureP";
import "../App.css";



function RowP(props) {
  const handleRightClick = (e)=>{
    e.preventDefault();
    console.log("Right Click on Row, Images will be restored")

    props.pictures.filter((picture) => picture.type === props.type).map((picture) => {
      return  props.globalList.removeIgnoredHunter(picture.id)
    })
    props.update();
  }

  const Filter_IDs = (ID,HunterPoints) =>{
    for (const hunter of HunterPoints){
      if (hunter.id===ID) return props.Criteria(hunter)
    }
    return false
  }
  return (
      <div onContextMenu={handleRightClick}>
        {/* {console.log("the list in global list to display is :",props.globalList.HunterPoints)} */}
        {props.pictures.filter((picture) => Filter_IDs(picture.id,props.globalList.HunterPoints)).map((picture) => {
          // console.log("here",props.globalList.HunterPoints)
          return <PictureP
                  url={picture.url} 
                  key={picture.id} 
                  id={picture.id} 
                  globalList={props.globalList}
                  needUpdate={props.needUpdate}
                  update={props.update}
                  container="bookP"
                />;
        })}
    </div>
  );
}

export default RowP;