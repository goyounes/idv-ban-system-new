import React, { useEffect, useState } from "react";
import Picture from "./Picture.js";
import { useDrop } from "react-dnd";
import * as DM from './DrawingMethods.js'
import "../App.css";

function importAll(r) {
  return r.keys().map(r);
}

const players = importAll(require.context('../images/players', false, /\.(png|jpe?g|svg)$/));

function Slot(props) {
  var [list, setList] = useState([]);
  // eslint-disable-next-line
  var [idList, setIdList] = useState([]);
  var [playerId, setPlayerId] = useState(-1);
  const GlobalList = props.globalList;

  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => {
      console.log(props.type)
      return props;
    },
    collect: (monitor) => ({
      isOverR: !!monitor.isOver(),
    }),
  }));

  const addPictureToSlot = (id) => {
    const pictureList = props.PictureList.filter((picture) => id === picture.id);
    // console.log("idList: ",idList);
    // pictureList[0].isUsed = true;
    setIdList([id]);
    // console.log("new id list after push",idList.push(id))
    setList([pictureList[0]]);
  };

  const handleRightClick = (e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      if (!list[0]?.url) return // if no images exists then just exit
      if (props.SpecialSlotID){
        props.globalList[props.SpecialSlotID] = ""
        props.update();
        return
      }

      const charId = GlobalList.getName(list[0].url);
      if (DM.CCM[charId]) {
        GlobalList.removeSelect(charId);
        GlobalList.removeBan(charId);
        GlobalList.removeRemoved(charId);
        setPlayerId(-1);
        DM.CCM[charId].R = 5; 
        DM.CCM[charId].RR = 5; 
        props.update();
      }
      
      console.log("Cleared");
      setList([]);
      setIdList([]);
      idList = [];
      list = [];
      
    }
  };

  const handleClick = (e) => {
    setPlayerId(playerId + 1);
    if (playerId === players.length-1){
        setPlayerId(-1);
    }
  };

  useEffect(()=>{
    if (GlobalList && props.slotID !== undefined){

        const slotID = props.slotID;
        if (GlobalList.value[slotID] === String(slotID)) {
          setList([]);
          setIdList([]);
          if (props.type ==='selects2' ) setPlayerId(-1);
        }else{
          const CharcterID = GlobalList.value[props.slotID]
          const PictureListID = GlobalList.getEquiv(CharcterID)
          // console.log("attempting to add picture with the ID: ",PictureListID," // CharcterID: ",CharcterID)
          addPictureToSlot(PictureListID)
          if (props.type ==='selects2' && playerId===-1) setPlayerId(0);
        }
      
    }
    if (GlobalList && props.SpecialSlotID){
      const SpecialSlotID = props.SpecialSlotID
      if (GlobalList[SpecialSlotID] === "") {
        setList([]);
        setIdList([]);
      }else{
        console.log("Special slot id => ", SpecialSlotID)
        const CharcterID = GlobalList[SpecialSlotID]
        const PictureListID = GlobalList.getEquiv(CharcterID)
        console.log("attempting to add picture with the ID: ",PictureListID," // CharcterID: ",CharcterID)
        addPictureToSlot(PictureListID);
      }
    }
    // eslint-disable-next-line
  },[props.needUpdate])

  return (
    <>
      <div className={props.type} ref={drop} 
        onClick={handleClick} 
        onContextMenu={handleRightClick}
        style={{backgroundColor:(props.type==="bans1" && props.slotID >= GlobalList.Round* 3-3)  ?"rgb(255,255,255)":"", 
        borderColor:(props.type==="bans1" && props.slotID >= GlobalList.Round* 3-3)  ?" rgb(255,255,255)":"",
        "backgroundImage":"url('"+(playerId === -1 ? "" : players[playerId])+"')"}}>
        {list.map((picture) => {
          return (<span key={picture.id}>
            <Picture 
              key={picture.id} 
              url={picture.url} 
              id={picture.id}
              globalList={props.globalList}
              needUpdate={props.needUpdate}
              update={props.update}
            />
          </span>);
        })}
      </div>
    </>
  );
}

export default Slot;