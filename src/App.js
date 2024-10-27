import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slot from "./components/Slot";
import Book from "./components/Book";
import MapSelect from "./components/MapSelect";
import Canvas from "./components/Canvas";
import GlobalBanPickList from "./components/GlobaBanPickList.js"
import React, { useState, useEffect } from "react";
import "./App.css";
// charctercolisionsmap = 
// updateMapByIdfunction  = function 
// GetIdOfColission(event,CCM) = function
// Handle canvas click event  ( use => SetGlobaList )

const PictureList = [];
const RescueList = [];
const SupportList = [];
const HarasserList = [];
const KiterList = [];
const DecodeList = [];
const OtherList = [];
const UselessList = [];
const InjuredStateList = [];
const Draggables = [];//{id: 1, url: "https://lh4.googleusercontent.com/-8tqTFxi2ebU/Ufo4j_thf7I/AAAAAAAADFM/_ZBQctm9e8E/w270-h203-no/flower.jpg"}];
//const LayersList = [];

function importAll(r) {
    return r.keys().map(r);
}

const rescuers = importAll(require.context('./images/survivors/rescuers', false, /\.(png|jpe?g|svg)$/));

const others = importAll(require.context('./images/survivors/others', false, /\.(png|jpe?g|svg)$/));
const kiters = importAll(require.context('./images/survivors/kiters', false, /\.(png|jpe?g|svg)$/));
const harassers = importAll(require.context('./images/survivors/harassers', false, /\.(png|jpe?g|svg)$/));
const supports = importAll(require.context('./images/survivors/supports', false, /\.(png|jpe?g|svg)$/));

const decoders = importAll(require.context('./images/survivors/decoders', false, /\.(png|jpe?g|svg)$/));
const useless = importAll(require.context('./images/survivors/useless', false, /\.(png|jpe?g|svg)$/));
const InjuredState = importAll(require.context('./images/survivors/InjuredState', false, /\.(png|jpe?g|svg)$/));



const  hunters_s = importAll(require.context('./images/hunters/s_tier', false, /\.(png|jpe?g|svg)$/));
const  hunters_a = importAll(require.context('./images/hunters/a_tier', false, /\.(png|jpe?g|svg)$/));
const hunters_b = importAll(require.context('./images/hunters/b_tier', false, /\.(png|jpe?g|svg)$/));
const hunters_c = importAll(require.context('./images/hunters/c_tier', false, /\.(png|jpe?g|svg)$/));
const hunters_d = importAll(require.context('./images/hunters/d_tier', false, /\.(png|jpe?g|svg)$/));
 
//const layers = importAll(require.context('./images/layers', false, /\.(png|jpe?g|svg)$/));
var count = 0;
 // variable that decides height of elemnts is nulified when map is bigger. (transfered to globalist object)

others.forEach(filename => {
  OtherList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "o" });
  count++;
});

rescuers.forEach(filename => {
  RescueList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "r" });
  count++;
});

kiters.forEach(filename => {
  KiterList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "k" });
  count++;
});

harassers.forEach(filename => {
  HarasserList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "h" });
  count++;
});

supports.forEach(filename => {
  SupportList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "s" });
  count++;
});

decoders.forEach(filename => {
  DecodeList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "d", isUsed: false });
  count++;
});

useless.forEach(filename => {
  UselessList.push({id: count, url: filename});
  PictureList.push({id: count, url: filename, type: "u", isUsed: false });
  count++;
});

InjuredState.forEach(filename => {
  InjuredStateList.push({id: count, url: filename});
  count++;
});

hunters_s.forEach(filename => {
  PictureList.push({id: count, url: filename, type: "hunter_s", isUsed: false });
  count++;
});

hunters_a.forEach(filename => {
  PictureList.push({id: count, url: filename, type: "hunter_a", isUsed: false });
  count++;
});

hunters_b.forEach(filename => {
  PictureList.push({id: count, url: filename, type: "hunter_b", isUsed: false });
  count++;
});

hunters_c.forEach(filename => {
  PictureList.push({id: count, url: filename, type: "hunter_c", isUsed: false });
  count++;
});

hunters_d.forEach(filename => {
  PictureList.push({id: count, url: filename, type: "hunter_d", isUsed: false });
  count++;
});



const globalList = new GlobalBanPickList();
function App() {
  // console.log(PictureList);
  console.log(" %c                                      <App Rendering . . .> ","color:red");
  console.log(globalList)
  const [needUpdate,setNeedUpdate] = useState(0);
  const update = () => { 
    setNeedUpdate(needUpdate + 1);
  }
  
  const [,setBigMapSTATE] = useState(false);
    useEffect(() => {
    const handleMKey = (e) => {
      if (e.keyCode === 77 ){ 
        // console.log("Event M recognized")
        globalList.mapSizeToggler()
        setBigMapSTATE(globalList.bigMap)
      }
    };
   window.addEventListener('keydown', handleMKey);
   return () => {
     window.removeEventListener('keydown', handleMKey);
   };
   // eslint-disable-next-line
 }, []);

  return (
 
    <DndProvider  backend={HTML5Backend}>
      <div className="App" id="IdvApp">
        <Canvas 
          type="canvas"
          PictureList={PictureList}
          globalList={globalList}
          needUpdate={needUpdate}
          draggables={Draggables}
          update={update}
        />
        <Book 
          PictureList={PictureList} 
          draggables={Draggables}
          globalList={globalList}
          needUpdate={needUpdate}
          update={update} 
        />
      <div>
        {  !globalList.bigMap && <div className="slots">
          <div className="phase" style={{border:"2px solid black",width:"677.8px",marginBottom:"1px"}}>
            <Slot PictureList={PictureList} slotID={0} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={1} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={2} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={3} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={4} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={5} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
          </div>
          { globalList.Round > 3 && <div className="phase" style={{border:"2px solid black",height:"100%",width:"337.12px",marginBottom:"1px"}}>
            <Slot PictureList={PictureList} slotID={6} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={7} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID={8} type="bans1" globalList={globalList} needUpdate={needUpdate} update={update} />
          </div>}
          <div className="phase">
            <Slot PictureList={PictureList} slotID ={9} type="bans2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={10} type="bans2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={11} type="selects2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={12} type="selects2" globalList={globalList} needUpdate={needUpdate} update={update} />
          </div>
          <div className="phase">
            <Slot PictureList={PictureList} SpecialSlotID ={"AB1"} type="altbans2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={13}           type="bans2"    globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={14}           type="selects2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} SpecialSlotID ={"AS1"} type="altselects2" globalList={globalList} needUpdate={needUpdate} update={update} />
          </div>
          <div className="phase">
            <Slot PictureList={PictureList} SpecialSlotID ={"AB2"} type="altbans2" globalList={globalList} needUpdate={needUpdate} update={update}  />
            <Slot PictureList={PictureList} slotID ={15}           type="bans2"    globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} slotID ={16}           type="selects2" globalList={globalList} needUpdate={needUpdate} update={update} />
            <Slot PictureList={PictureList} SpecialSlotID ={"AS2"} type="altselects2" globalList={globalList} needUpdate={needUpdate} update={update} />
          </div>
        </div> 

        } 
          <MapSelect PictureList={PictureList} globalList={globalList}/>
      </div>
    </div>
    </DndProvider>
  );
}

export default App;