import React, { useRef, useEffect } from 'react';
import HunterSlot from './HunterSlot';
import * as DM from './DrawingMethods.js'
import "../App.css";
const GetIdOfColission = DM.GetIdOfColission
const CCM = DM.CCM

const images0 = [];
const images1 = [];
const images2 = [];
const images3 = [];
const images4 = [];

function importAll(r) {
    return r.keys().map(r);
}

const             base = importAll(require.context('../images/layers/Base', false, /\.(png|jpe?g|svg)$/));
const         hlayers0 = importAll(require.context('../images/layers/0', false, /\.(png|jpe?g|svg)$/));
const         hlayers1 = importAll(require.context('../images/layers/1', false, /\.(png|jpe?g|svg)$/));
const         hlayers2 = importAll(require.context('../images/layers/2', false, /\.(png|jpe?g|svg)$/));
const         hlayers3 = importAll(require.context('../images/layers/3', false, /\.(png|jpe?g|svg)$/));
const         hlayers4 = importAll(require.context('../images/layers/4', false, /\.(png|jpe?g|svg)$/));

var N1_BlackLinesImg = new Image();
N1_BlackLinesImg.src = base[0];

var N2_RedLinesimg = new Image();
N2_RedLinesimg.src = base[1];

var N4_Grey_CharctersImg = new Image();
N4_Grey_CharctersImg.src = base[2];

function makeImagesArr(layerX){
  const images = [];
  layerX.forEach(filepath => {
    var img = new Image();
    img.src = filepath
    images.push(img);
  });
  return images
}

images0.push(...makeImagesArr(hlayers0));
images1.push(...makeImagesArr(hlayers1));
images2.push(...makeImagesArr(hlayers2));
images3.push(...makeImagesArr(hlayers3));
images4.push(...makeImagesArr(hlayers4));

function Canvas(props) {
  const GlobalList = props.globalList
  const canvasRef = useRef(null);
    
  const handleCanvasClick =(event)=>{ // C : charcter
    if (event.type === 'contextmenu') event.preventDefault();
    let val = 0;
    if (event.type === 'click')       {  val =  1; console.log('Left click Detected') ;}
    if (event.type === 'contextmenu') {  val = -1; console.log('Right click Detected');}

    const CharcterHitID = GetIdOfColission(event,CCM);
    if (CharcterHitID === 0) return // signals no hit
    const charcterData = CCM[CharcterHitID]
    
    if (val > 0){
      if (GlobalList.isSelected(CharcterHitID)){
        GlobalList.bookShouldOpen = true
      }   
      else if (!GlobalList.idExist(CharcterHitID)){  
        GlobalList.addSelect(CharcterHitID)                      
      }
      else if (GlobalList.isBanned(CharcterHitID)){
        GlobalList.removeBan(CharcterHitID)
        charcterData.R=5 ;
      }
      else if (GlobalList.isRemoved(CharcterHitID)){
        GlobalList.addBan(CharcterHitID)
        charcterData.RR=5;
      }
    }
    if (val < 0){
      if (GlobalList.isSelected(CharcterHitID) ){
         GlobalList.removeSelect(CharcterHitID); 
         charcterData.R=5 
      }
      else if (!GlobalList.idExist(CharcterHitID)){
        if (!GlobalList.addBan(CharcterHitID)){
          GlobalList.addRemoved(CharcterHitID)
        }
        charcterData.RR=5
      }
      else if (GlobalList.isBanned(CharcterHitID)){
         GlobalList.addRemoved(CharcterHitID)                     
      }
      else if (GlobalList.isRemoved(CharcterHitID)){
        // Nothing to do
      }
    }
    props.update();
    // console.log("%c Modified list after the update =>","color:green", GlobalList)
  };

  const AnimationActive = useRef(null);

  function animate(){
    console.log("     Animate() function excuted");
    AnimationActive.current = true
    const layerID0 = GlobalList.layerID(props.PictureList[GlobalList.hunterSlot0]?.url)
    const layerID1 = GlobalList.layerID(props.PictureList[GlobalList.hunterSlot1]?.url)
    const layerID2 = GlobalList.layerID(props.PictureList[GlobalList.hunterSlot2]?.url)
    const layerID3 = GlobalList.layerID(props.PictureList[GlobalList.hunterSlot3]?.url)
    const layerID4 = GlobalList.layerID(props.PictureList[GlobalList.hunterSlot4]?.url)
    // Start drawing
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(N1_BlackLinesImg, 0, 0, canvas.width, canvas.height);
    context.drawImage(N2_RedLinesimg, 0, 0, canvas.width, canvas.height);

    // 3 Draw Hunter layers()
    context.globalAlpha = 0.7
    if (layerID0 !== -1) {
      //Do nothing
    }else{
      context.globalAlpha = 0.7
      if (layerID1 !== -1) { context.drawImage(images1[layerID1-1], 0, 0, canvas.width, canvas.height)     ;     context.drawImage(images1[layerID1-1], 0, 0, canvas.width, canvas.height); }
      context.globalAlpha = 0.5
      if (layerID2 !== -1) { context.drawImage(images2[layerID2-1], 0, 0, canvas.width, canvas.height)     ;     context.drawImage(images2[layerID2-1], 0, 0, canvas.width, canvas.height); }
      context.globalAlpha = 0.4
      if (layerID3 !== -1) { context.drawImage(images3[layerID3-1], 0, 0, canvas.width, canvas.height)     ;     context.drawImage(images3[layerID3-1], 0, 0, canvas.width, canvas.height); }
      context.globalAlpha = 0.3
      if (layerID4 !== -1) { context.drawImage(images4[layerID4-1], 0, 0, canvas.width, canvas.height)     ;     context.drawImage(images4[layerID4-1], 0, 0, canvas.width, canvas.height); }
    }

    // 4 - Draw Grey Charcters
    context.globalAlpha = 0.4;
    context.filter = 'grayscale(1)';
    context.drawImage(N4_Grey_CharctersImg, 0, 0, canvas.width, canvas.height);
    context.filter = "none";
    context.globalAlpha = 1;

    DM.Draw_51_Selection_Layer       (GlobalList.getSelected(),context,canvas.width, canvas.height)
    DM.Draw_5_Selection_Layer_BG     (GlobalList.getSelected(),context,canvas.width, canvas.height)
    if (layerID0 !== -1) {// if there is a hunter that's selected
      DM.DrawLayerWithSelectedMask(GlobalList.getSelected(),images0[layerID0-1],context,canvas.width, canvas.height)
      context.globalAlpha = 0.3;
      context.drawImage(N4_Grey_CharctersImg, 0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
    }
    DM.Draw_6_Clean_Hunter_Layer     (GlobalList.getBannedRemoved(),context,canvas.width, canvas.height)
    DM.Draw_7_Black_Lines_Gone_Layer (GlobalList.getBannedRemoved(),context,canvas.width, canvas.height)

    context.drawImage(N2_RedLinesimg, 0, 0, canvas.width, canvas.height);
    context.drawImage(N2_RedLinesimg, 0, 0, canvas.width, canvas.height);
    context.drawImage(N2_RedLinesimg, 0, 0, canvas.width, canvas.height);

    DM.Draw_71_Red_Lines_Gone_Layer (GlobalList.getRemoved(),context,canvas.width, canvas.height)
    DM.Draw_8_Banned_Charcters_Layer(GlobalList.getBanned(),context,canvas.width, canvas.height)
    
    if (DM.AnimationNotOver(CCM)) {
      window.requestAnimationFrame(animate)
    }else{
      AnimationActive.current = false;
      if (GlobalList.is1SurvsSelecteded()){
        if (!GlobalList.isSurvsSelectionomplete()) {
          DM.loopOpacity()
          window.requestAnimationFrame(animate);
          AnimationActive.current = true
        } else if (!DM.freezeOpacity()){
          window.requestAnimationFrame(animate);
          AnimationActive.current = true
        }
      }else{
        DM.resetOpacity();
      }
    }
  }

  useEffect(() => {
    if (!AnimationActive.current)  console.log(" %c                      Will call Animate() function excuted","color:red");
    if (!AnimationActive.current)  window.requestAnimationFrame(animate);
    N1_BlackLinesImg.onload = function() {
      animate();
    }
    N4_Grey_CharctersImg.onload = function() {
      animate();
    }
    // eslint-disable-next-line
  },[props.needUpdate]);

  useEffect(() => {
    const handleDel = (e) => {
       if (e.keyCode === 46 || e.keyCode === 8) {
        props.globalList.Clear()
        DM.resetCCM()
        props.update();
      }
    };
    window.addEventListener('keydown', handleDel);
    
    return () => {
      window.removeEventListener('keydown', handleDel);
    };
    // eslint-disable-next-line
  }, []);

  const handleClearButtonClick =() =>{
    props.globalList.Clear()
    DM.resetCCM()
    props.update();
  };
  const  handleNextRoundButtonClick = (e) =>{
    if (e.type==="click"){
      props.globalList.NextRound()
      DM.resetCCM();
      props.update();   
    }else if (e.type === 'contextmenu'){
      e.preventDefault()
      props.globalList.PreviousRound()
      props.update();
    }

  };
  const  handleExportButtonClick = () =>{
    const message = props.globalList.exportList();
    alert("Exported the List : \n"+ message.join()+'"' );
  };
  
  const handleImportButtonClick = ()=>{
    navigator.clipboard
    .readText()
    .then((clipText) => {
      props.globalList.importList(clipText);
      props.update();
    });
  }

  const Button1 = {
    "border":"2px solid black",
    "marginTop":"0px",
    "marginLeft":"7.5px",
    "height": '108px',
    "width" : '115px',
    "fontSize":"35px",
  }
  
  const Button2 = {
    "border":"2px solid black",
    "marginBottom":"11.14px",
    "marginLeft":"7.5px",
    "height": '108px',
    "width" : '145px',
    "fontSize":"35px",
  }

  return (
    <div>
        <canvas className="canvas" width="850" height="692" ref={canvasRef} onClick={handleCanvasClick} onContextMenu={handleCanvasClick}/>
        <div className="hunterslots" width="850">
          <div className="huntertable">
            <div>
              <HunterSlot PictureList={props.PictureList} type="huntertableslot" SpecialSlotID={"hunterSlot1"}
              globalList={GlobalList} needUpdate={props.needUpdate} update={props.update} />
              <HunterSlot PictureList={props.PictureList} type="huntertableslot" SpecialSlotID={"hunterSlot3"}
              globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
            </div>
            <div>
              <HunterSlot PictureList={props.PictureList} type="huntertableslot" SpecialSlotID={"hunterSlot2"}
              globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
              <HunterSlot PictureList={props.PictureList} type="huntertableslot" SpecialSlotID={"hunterSlot4"}
              globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
            </div>
          </div>
          <div>
              <div>
                <button onClick={handleClearButtonClick}      style={Button1}>Clear</button>
                <button onClick={handleNextRoundButtonClick} onContextMenu={handleNextRoundButtonClick} style={Button2}>Round:{props.globalList.Round}</button>
              </div>
              <div>
                <button onClick={handleExportButtonClick}    style={Button1}>Export</button>
                <button onClick={handleImportButtonClick}    style={Button2}>Import</button>
              </div>
          </div>
            <div style={{marginLeft:"7.5px"}}>
            <HunterSlot PictureList={props.PictureList} SpecialSlotID={"hunterBan1"} type="hunterbans"       globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
            <HunterSlot PictureList={props.PictureList} SpecialSlotID={"hunterSlot0"}type="huntertableslot0" globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
          </div>
          <div>
            <HunterSlot PictureList={props.PictureList} SpecialSlotID={"hunterBan2"} type="hunterbans"       globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
          </div>
          <div>
            <HunterSlot PictureList={props.PictureList} SpecialSlotID={"hunterBan3"} type="hunterbans"       globalList={GlobalList} needUpdate={props.needUpdate} update={props.update}/>
          </div>
        </div>
    </div>
  );
}

export default Canvas;