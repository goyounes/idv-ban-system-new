import React, {useEffect, useState} from "react";
import { useDrag } from "react-dnd";
import * as DM from './DrawingMethods.js'

function Picture(props) {
  const [isUsed, setIsUsed] = useState(false);
  const GlobalList = props.globalList;
  const [borderColor, setBorderColor] = useState("transparent");
  // const borderColor = useRef("transparent")
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: props.id, url: props.url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log("Dropped " + dropResult.type);
        if (dropResult.type === "book") {
          // do Nothing
        } else {
          if (dropResult.type === "altbans2" || dropResult.type === "altselects2") { if (props.id>41) return
            console.log("Attempting to add"+props.id+"to specialSlotId:" +dropResult.SpecialSlotID)
            GlobalList[dropResult.SpecialSlotID] = GlobalList.getEquiv(props.id)
            props.update();
          }else{// if this is altBan or altSelect then:
            if (dropResult.type === "bans1") { if (props.id>41) return
                  const charName = GlobalList.getName(props.url);
                  console.log("Name: "+charName);
                  if (DM.CCM[charName]) {
                    GlobalList.addRemoved(charName);
                    props.update();
                  }
            } else if (dropResult.type==="bans2"){ if (props.id>41) return
                  const charName = GlobalList.getName(props.url);
                  console.log("Name: "+charName);
                  if (DM.CCM[charName]) {
                    GlobalList.addBan(charName);
                    props.update();
                  }
            } else if ( dropResult.type === "selects2") { if (props.id>41) return
                  const charName = GlobalList.getName(props.url);
                  console.log("Name: "+charName);
                  if (DM.CCM[charName]) {
                    GlobalList.addSelect(charName);
                    props.update();
                  }
            } else if (dropResult.type === "hunterbans") { if (props.id<=41) return
                  if (GlobalList.hunterSlot0 === props.id){
                    GlobalList.hunterSelect = "";
                    GlobalList.hunterSlot0  = -1;
                  }
                  GlobalList.addHunterBan(props.id);
                  props.update();
                  return;
            } else if(dropResult.type==="huntertableslot0" || dropResult.type==="huntertableslot"){ if (props.id<=41) return
                GlobalList[dropResult.SpecialSlotID] = props.id
                props.update();
                if(dropResult.type==="huntertableslot0") { // only for Hunter select 
                  GlobalList.hunterSelect = GlobalList.getEquiv(props.id);
                  GlobalList.removeHunterBan(props.id);
                }
            }
          }
        }
      }
    },
  }), [props.update]);

  function togglePic(e) {
    e.preventDefault();
    if (e.target.style.visibility==="hidden"){
    }else{
      e.target.style.visibility="hidden";
    }
  }

  const handleClick = (e) => {
    if (e.type === 'contextmenu') {
      console.log("right click");
      e.preventDefault();
      if (props.container==="book" && props.id > 41){ // Code to hide the picture on clicking is here // Find the reactivation code in Row(props)
        e.stopPropagation();
        if (!GlobalList.isHunterUsed(props.id)){// condition was !isUsed, but i removed it because i like hunters without opacity
          togglePic(e);
          setBorderColor("transparent");
        }
      } 
      if (!GlobalList) return

      const charId = GlobalList.getName(props.url);
      console.log("Name: "+charId);
      if (DM.CCM[charId]) {
        GlobalList.removeSelect(charId);
        GlobalList.removeBan(charId);
        GlobalList.removeRemoved(charId);
        props.update();
      }else{
        const clearHunter = ()=>{
          setIsUsed(false);
          setBorderColor('transparent')
          return -1
        }
        debugger
        if (GlobalList.hunterSlot0 === props.id ) {
          GlobalList.hunterSlot0 = clearHunter();
          GlobalList.hunterSelect ="";
        }
        if (GlobalList.hunterSlot1 === props.id ) GlobalList.hunterSlot1 = clearHunter();
        if (GlobalList.hunterSlot2 === props.id ) GlobalList.hunterSlot2 = clearHunter();
        if (GlobalList.hunterSlot3 === props.id ) GlobalList.hunterSlot3 = clearHunter();
        if (GlobalList.hunterSlot4 === props.id ) GlobalList.hunterSlot4 = clearHunter();
        if (GlobalList.hunterBan1  === props.id ) GlobalList.hunterBan1 = clearHunter();
        if (GlobalList.hunterBan2  === props.id ) GlobalList.hunterBan2 = clearHunter();
        if (GlobalList.hunterBan3  === props.id ) GlobalList.hunterBan3 = clearHunter();
        props.update();
      }
    }
  };
  const getBgColor = (borderColor) =>{
    if (borderColor==='green')  return "rgba(  0, 128,   0, 0.9)"
    if (borderColor==='red')    return "rgba(255,   0,   0, 0.9)"
    if (borderColor==='black')  return "rgba(  20,   20,   20, 0.9)"
  }
  useEffect(()=>{
    if (GlobalList && props.container === "book"){
      const charcterID = GlobalList.getEquiv(props.id)
      // check the if the corresponding charcter is present in either Select, Bans or Removed charcters and apply correct border
      if (props.id <= 41 ) {
        if (GlobalList.idExist(charcterID)){
          setIsUsed(true);
          if (GlobalList.isSelected(charcterID))  { setBorderColor('green') }
          if (GlobalList.isBanned(charcterID))    { setBorderColor('red')   } 
          if (GlobalList.isRemoved(charcterID))   { setBorderColor('black') }
        }else{
          if (borderColor!=='transparent') {
            setBorderColor('transparent')
            setIsUsed(false);
          }
        }

      } else if(props.id > 41){
        if      (GlobalList.hunterSlot0 === props.id) {
          setBorderColor('green');
        }else if(GlobalList.hunterSlot1 === props.id || GlobalList.hunterSlot2 === props.id || GlobalList.hunterSlot3 === props.id ||GlobalList.hunterSlot4 === props.id)
        {
          setBorderColor('black')
        }else if (GlobalList.hunterBan1 === props.id || GlobalList.hunterBan2 === props.id ||GlobalList.hunterBan3 === props.id ){
          setBorderColor('red')
        }else{
          if (borderColor!=='transparent') setBorderColor('transparent')
        }
    }}// eslint-disable-next-line
  },[props.needUpdate])
  // console.log("rest is ",props.reset)
  return (
    <span>
      <img
        ref={drag}
        src={props.url}
        width="90vh"
        style={{visibility: props.reset ? 'visible' : '',border: isDragging ? "7px solid white" : "7px solid "+ borderColor , opacity: isUsed ? "60%" : "100%",backgroundColor: getBgColor(borderColor)}}
        alt="Invalid URL"
        onContextMenu={handleClick}
      />
    {/* {(borderColor.current==="black") && console.trace("border colour for",props.url," =>", borderColor.current)} */}
    </span>
  );
}

export default Picture;