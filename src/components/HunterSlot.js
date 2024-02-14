import React, { useEffect, useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../App.css";

function HunterSlot(props) {
  var [list, setList] = useState([]);
  var [idList, setIdList] = useState([]);
  const GlobalList = props.globalList

  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => {
      console.log(item);
      console.log(props.PictureList);
      console.log('the required object is =>',item.id, item.url)
      // addPictureToSlot(item.id, item.url);
      return props;
    },
    collect: (monitor) => ({
      isOverR: !!monitor.isOver(),
    }),
  }));

  const addPictureToSlot = (id, url) => {
    const pictureList = props.PictureList.filter((picture) => id === picture.id);
    const split = url.split("_");
    const layerId = split.length === 4 ? split[2] : -1;
    console.log("Hunter slot id: "+id);
    console.log("Hunter layer id: "+layerId);
    console.log("idList: ",idList);

    if ((props.type === "huntertableslot" || props.type === "huntertableslot0") && layerId === -1){ 
      console.log("This hunter is not supported yet, No Canvas Layer will be drawn"); // not supported
    } else {
        // console.log(GlobalList)
        GlobalList[props.SpecialSlotID] = id
    }
    setIdList([id]);
    setList([pictureList[0]]);
  };

  const handleClick = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      if (!list[0]?.url) return // if no images in the slot then just exit

      setList([]);
      setIdList([]);
      idList = [];
      list = [];
      console.log("Cleared");
      if (props.SpecialSlotID==="hunterSlot0") {
        GlobalList.hunterSelect = ""
      }
      GlobalList[props.SpecialSlotID] = -1
      props.update()
      console.log("after clearing", GlobalList)
    }
  };

  useEffect(()=>{
    if (GlobalList && props.SpecialSlotID){
      const SpecialSlotID = props.SpecialSlotID
      if (GlobalList[SpecialSlotID] === -1) {
        setList([]);
        setIdList([]);
      }else{
        const PictureListID = GlobalList[SpecialSlotID]
        addPictureToSlot(PictureListID,props.PictureList[PictureListID].url);
      }
    }
// eslint-disable-next-line
  },[props.needUpdate])
  
  const str = props.SpecialSlotID;
  const X = Number(str.charAt(str.length-1)) 
  return (
    <>
      <div className={props.type} ref={drop}  onContextMenu={handleClick}
              style={{backgroundColor:(props.type==="hunterbans" && X >= GlobalList.Round)  ?"rgb(255,255,255)":"", 
              borderColor:(props.type==="hunterbans" && X>= GlobalList.Round)  ?"rgb(255,255,255)":""}}>
        {list.map((picture) => {
          return (<span key={picture.id} onContextMenu={handleClick}>
            <Picture key={picture.id} url={picture.url} id={picture.id} 
            globalList={props.globalList} needUpdate={props.needUpdate} update={props.update}/>
          </span>);
        })}
      </div>
    </>
  );
}

export default HunterSlot;