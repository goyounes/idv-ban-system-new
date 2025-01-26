import React, { useState, useReducer } from "react";
//import Draggable from "./Draggable";

function importAll(r) {
    return r.keys().map(r);
}

const TinidusState = importAll(require.context('../images/hunters/TinidusStates', false, /\.(png|jpe?g|svg)$/));
const InjuredState = importAll(require.context('../images/survivors/SurvivorStates/InjuredState', false, /\.(png|jpe?g|svg)$/));
const HealthyState = importAll(require.context('../images/survivors/SurvivorStates/HealthyState', false, /\.(png|jpe?g|svg)$/));
const DownedState  = importAll(require.context('../images/survivors/SurvivorStates/DownedState', false, /\.(png|jpe?g|svg)$/));
const ChairedState0 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState0', false, /\.(png|jpe?g|svg)$/));
const ChairedState1 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState1', false, /\.(png|jpe?g|svg)$/));
const ChairedState2 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState2', false, /\.(png|jpe?g|svg)$/));
const ChairedState3 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState3', false, /\.(png|jpe?g|svg)$/));
const ChairedState4 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState4', false, /\.(png|jpe?g|svg)$/));
const ChairedState5 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState5', false, /\.(png|jpe?g|svg)$/));
const ChairedState6 = importAll(require.context('../images/survivors/SurvivorStates/ChairedState6', false, /\.(png|jpe?g|svg)$/));
const ScareFace = importAll(require.context('../images/hunters/s_tier/ScareFace', false, /\.(png|jpe?g|svg)$/));

const SOURCES = []
for (let i = 0; i<=41;i++){
   const array = []
   array.push(HealthyState[i])
   array.push(InjuredState[i])
   array.push(DownedState[i])
   array.push(ChairedState0[i])
   array.push(ChairedState1[i])
   array.push(ChairedState2[i])
   array.push(ChairedState3[i])
   array.push(ChairedState4[i])
   array.push(ChairedState5[i])
   array.push(ChairedState6[i])
   SOURCES.push(array)
}

for (let i = 42; i<=63;i++){
    SOURCES.push([TinidusState[i-42]])
}

// console.log("SOURCES ----> ",SOURCES)

const arms = importAll(require.context('../images/maps/arms', false, /\.(png|jpe?g|svg)$/));
const chinatown = importAll(require.context('../images/maps/chinatown', false, /\.(png|jpe?g|svg)$/));
const church = importAll(require.context('../images/maps/church', false, /\.(png|jpe?g|svg)$/));
const eversleeping = importAll(require.context('../images/maps/eversleeping', false, /\.(png|jpe?g|svg)$/));
const hospital = importAll(require.context('../images/maps/hospital', false, /\.(png|jpe?g|svg)$/));
const lakeside = importAll(require.context('../images/maps/lakeside', false, /\.(png|jpe?g|svg)$/));
const leos = importAll(require.context('../images/maps/leos', false, /\.(png|jpe?g|svg)$/));
const moonlit = importAll(require.context('../images/maps/moonlit', false, /\.(png|jpe?g|svg)$/));

const combinedMaps = [arms, chinatown, church, eversleeping, hospital, lakeside, leos, moonlit];

const progressBarImages = importAll(require.context('../images/progressBars', false, /\.(png|jpe?g|svg)$/));

var drag = false;
var targ = undefined;
var coordX = 0;
var coordY = 0;
var offsetX = 0;
var offsetY = 0;

 

function MapSelect(props) {
    //Situation specific code
    const handleLeftDirectionButtonClick=()=>{
        props.globalList.PreviousSituation()
        props.update();
      }
      const handleRightDirectionButtonClick=()=>{
        props.globalList.NextSituation()
        props.update();
      }
      const handleUptDirectionButtonClick=()=>{
        props.globalList.PreviousCase()
        props.update();
      }
      const handleDownDirectionButtonClick=()=>{
        props.globalList.NextCase()
        props.update();
      }

    //   const calculatedHeight =  GlobalList.bigMap ? "1000vh":"450vh"

      const StateText = {
        "border":"2px solid black",
        "height":  '43px',
        "width" : '100px',
        "fontSize":"20px",
        "padding":"2px",
        "marginTop":"-5px",
        "display":  props.globalList.bigMap ? "":"none"
      }
      const CaseText = {
        "border":"2px solid black",
        "height": '40px',
        "width" : '100px',
        "fontSize":"20px",
        "padding":"2px",
        "display":  props.globalList.bigMap ? "":"none",
    }
      const LButton1 = {
        "border":"2px solid black",
        "height": '40px',
        "width" : '60px',
        "fontSize":"20px",
        "padding":"2px",
        "display":  props.globalList.bigMap ? "":"none",
    }
    // Map select code ~~
    const GlobalList = props.globalList;
    const PBS = GlobalList.PBS
    const [map, setMap] = useState(0);
    const [cipherNum, setCipherNum] = useState(GlobalList.cipherLayout);
    const [, update] = useReducer(x => x + 1, 0); // to update when clicking

    const handleMapChange = (e) => {
        setMap(e.target.value);
        GlobalList.Map = e.target.value;
    };

    const increaseCipherNum = (e) => {
        GlobalList.cipherLayout++;
        if (cipherNum === combinedMaps[map].length-1)  GlobalList.cipherLayout = 1        
        update();
    }

    const decreaseCipherNum = (e) => {
        GlobalList.cipherLayout--;
        if (cipherNum === 1)  GlobalList.cipherLayout = combinedMaps[map].length-1
        update();
    }

    const resetCipherNum = (e) => {
        GlobalList.cipherLayout = 0
        update();
    }

    const calculatedHeight =  GlobalList.bigMap ? "1000vh":"450vh"
    // console.log("calculated height is = ", calculatedHeight)
    const mapselect = {
        "textAlign": "Left",        
        "minWidth": "530px",
    }
    const button = {
        "fontSize":"20px",
        "height":"30px",
        "border":"2px solid black",
    }
    const texte = {
        "fontSize":"20px",
    }

    // Draging Logic Start

    function startDrag(e) {
        // determine event object
        if (!e) {
            e = window.event;
        }
    
        if (e.preventDefault) e.preventDefault();
        
        // IE uses srcElement, others use target
        //targ = e.targetS ? e.target : e.srcElement;
        targ = e.target;

        // console.log(targ.style.left,targ.style.top)

        if (targ.className !== 'dragme') {return};
        // calculate event X, Y coordinates
        offsetX = e.clientX;
        offsetY = e.clientY;
    
            if(!targ.style.left) { targ.style.left='0px'};
            if (!targ.style.top) { targ.style.top='0px'};
    
        coordX = parseInt(targ.style.left);
        coordY = parseInt(targ.style.top);

        drag = true;
        // move div element
        //document.onmousemove=dragDiv;
        return false;
    }
    function dragDiv(e) {
        // console.log(drag)
        // if (dragging) return
        if (!drag) {return};
        // console.log("I'm being dragged ! ")
        if (!e) { e = window.event};
        // var targ=e.target?e.target:e.srcElement;
        // move div element
        // dragging=true
        // setTimeout(()=>{dragging=false},1)
        targ.style.left = coordX + e.clientX - offsetX + 'px';
        targ.style.top  = coordY + e.clientY - offsetY + 'px';
        

        return false;
    }
    function stopDrag(e) {
        if (e.target.id!=="") GlobalList.Positions[e.target.id] = [coordX+e.clientX-offsetX+'px',coordY+e.clientY-offsetY+'px',  props.globalList.Positions[e.target.id] && props.globalList.Positions[e.target.id][2] + 0] //0 is the state of the img, aka the default source
        drag=false;
    }

    // Draging Logic Ending


    function spawnProgressBar(e){
        PBS.push({id:PBS.length,V: 0,P:{x:e.clientX-100,y:e.clientY-20}})
        update()
        console.log(PBS)
    }

    function getProgressAdder(id,e){
        // console.log("this creates a function that will be used to increase the progress when progress bar N:",id,"is clicked")
        return (e)=>{
            // console.log(`BEFORE: the prgoress bar N° ${id} ${progressBars[id].value}0% cipher progress `)
            PBS[id].V++
            if (e.shiftKey) PBS[id].V++
            if (PBS[id].V > progressBarImages.length - 1){
                PBS[id].V = progressBarImages.length - 1;
                update()
                // console.log(`AFTER: the prgoress bar N° ${id} ${progressBars[id].value+1}0% cipher progress `)
                return
            }
            // console.log(`AFTER: the prgoress bar N° ${id} ${progressBars[id].value+1}0% cipher progress `)
            const imgElement = document.getElementById("PB"+id);
            imgElement.src = progressBarImages[PBS[id].V]
        }
    }    
    function getProgressReducer(id,e){
        // console.log("this creates a function that will be used to decrease the progress when progress bar N:",id,"is clicked")
        return (e)=>{
            e.preventDefault()
            //Delte Bar if shift was held while Right Clicking
            if (e.ctrlKey) {
                // console.log("shift was pressed")
                PBS[id]=null
                update();
                return
            }
            PBS[id].V--;
            if (e.shiftKey) PBS[id].V--

            if (PBS[id].V < 0) {
                PBS[id] = null
                update();
                return
            }
            const imgElement = document.getElementById("PB"+id);
            imgElement.src = progressBarImages[PBS[id].V]
        }
    }
    function nextIndex (array,index,Direction){
        if(Direction === "Right"){
            if (index + 1 > array.length)   return 0
            return index + 1
        }
        if(Direction === "Left"){
            if (index - 1 < 0 )   return array.length
            return index -1
        }
        console.log("No direction was recognised, the options are: Left & Right")
    }

    function AdjustPosition(i,id){
        if (i === 0){
            props.globalList.Positions[id][0] =  parseInt(props.globalList.Positions[id][0] || 0) + 200 +"px"
            props.globalList.Positions[id][1] =  parseInt(props.globalList.Positions[id][1] || 0) + 200 +"px"
        }else if (i !== 0){
            props.globalList.Positions[id][0] =  parseInt(props.globalList.Positions[id][0] || 0) - 200 +"px"
            props.globalList.Positions[id][1] =  parseInt(props.globalList.Positions[id][1] || 0) - 200 +"px"
        }
    }
    function srcCyclerMaker(id){
        // console.log("this creates a function that will be cycle through all different Srcs of state images for one survivor/hunter")
        if (id > 41) return (e)=>{
        //HUNTER CYCLER
            e.preventDefault()
            const currenti = props.globalList.Positions[id][2] || 0
            if (e.shiftKey){
                const Nexti = nextIndex(SOURCES[id],currenti,"Left")
                props.globalList.Positions[id][2]= Nexti
                AdjustPosition(Nexti,id)
            }else{
                const Nexti = nextIndex(SOURCES[id],currenti,"Right")
                props.globalList.Positions[id][2]= Nexti
                AdjustPosition(Nexti,id)
            }
            props.update()
        } 
        //SURVIVOR CYCLER
        return (e)=>{
            e.preventDefault();
            const currenti = props.globalList.Positions[id][2] || 0
            if (e.shiftKey){
                const Nexti = nextIndex(SOURCES[id],currenti,"Left")
                props.globalList.Positions[id][2]= Nexti
            }else{
                const Nexti = nextIndex(SOURCES[id],currenti,"Right")
                props.globalList.Positions[id][2]= Nexti
            }
            props.update()
        }
    }

    
    return (
        <div style={mapselect} onMouseMove={dragDiv}>
            {/* {mconsole.log('%c Map Object Re rendered',"color:red;")} */}
            {/* <br></br> */}
            <div>
                <label style={texte} htmlFor="mapselect">Map: </label>
                <select  style={button} name="mapselect" value ={GlobalList.Map===""?"0":GlobalList.Map} onChange={handleMapChange}>
                    <option value="0" >Arms Factory</option>
                    <option value="2" >Red Church</option>
                    <option value="4" >Sacred Heart Hospital</option>
                    <option value="5" >Lakeside Village</option>
                    <option value="7" >Moonlit River Park</option>
                    <option value="6" >Leos Memory</option>
                    <option value="3" >Eversleeping Town</option>
                    <option value="1" >Chinatown</option>
                </select>
            {(map!==GlobalList.Map) && setMap(GlobalList.Map)}
            {(cipherNum!==GlobalList.cipherLayout) && setCipherNum(GlobalList.cipherLayout)}
                <label style={texte}> Ciphers: </label>
                <button style={button} onClick={decreaseCipherNum}>-</button>
                <label style={texte}> {cipherNum} </label>
                <button style={button} onClick={increaseCipherNum}>+</button>
                <label style={{marginLeft:"10px"}}> </label>
                <button style={button} onClick={resetCipherNum} >All In</button>
                    <label style={{marginLeft:"40px"}}> </label>
                <button onClick={handleLeftDirectionButtonClick}   style={LButton1}>◀</button>
                <button style={StateText}>State {GlobalList.situationIndex +1}</button>
                <button onClick={handleRightDirectionButtonClick}  style={LButton1}>▶</button>
                    <label style={{marginLeft:"30px"}}> </label>
                <button style={CaseText}>Case  {GlobalList.situationCase +1}</button>
                <button onClick={handleUptDirectionButtonClick}    style={LButton1}>▲</button>
                <button onClick={handleDownDirectionButtonClick}   style={LButton1}>▼</button>
            </div>
            
            <div>
                {/* Survivor and Hunter charecters Code */}
                <div style={{"height": "0px"}}>
                    {GlobalList.getMapCharcters().filter((id)=>id!==null).map((id) => {
                        const srcCycler = srcCyclerMaker(id)
                        // const [x,y] = GlobalList.getIdCoords(id)
                        let  [x1,y1]= GlobalList.getIdCoords1(id)
                        if (x1 === null || y1 === null){
                            const order = GlobalList.getMapCharcters().indexOf(id)
                            x1 = `${1500 + parseInt(order * 80)}px`; y1 = `${515 + Math.floor(GlobalList.Round/3)*100}px`; 
                            // console.log("used Nothing for X1 Y1 because  they dont exist"); 
                        }
                        let index = GlobalList.getSrcIndex(id)
                        return (<img 
                                    id={id}
                                    // src={props.PictureList[id].url} key={id} alt="todo" 
                                    src={ (index && SOURCES[id][index-1] ) || props.PictureList[id].url } key={id} alt="todo" 
                                    height= { (id>41 && index === 1 && "480px")  || "80px" }
                                    // height= "80px" 
                                    style={{"position": "absolute",
                                    "cursor": "move",
                                    left : x1,
                                    top :  y1,
                                    }}
                                    
                                    className="dragme" 
                                    onMouseDown={startDrag} 
                                    onMouseUp={stopDrag} 
                                    onMouseMove={dragDiv}
                                    onContextMenu={srcCycler} 
                                                           
                                />);
                    })
                    }{/* add aanother image if ivy is the selected hunter, the image is the scare face */}
                    { 
                    GlobalList.getMapCharcters().filter((id)=>id===43).map((id) => {
                        let  [x1,y1]= GlobalList.getIdCoords1(id)
                        if (x1 === null || y1 === null){
                            const order = GlobalList.getMapCharcters().indexOf(id)
                            x1 = `${1500 + parseInt(order * 80)}px`; y1 = `${515 + 80 + Math.floor(GlobalList.Round/3)*100}px`; 
                        }
                        return (<img 
                                    id={100}
                                    src={ScareFace[0]} key={100} alt="todo" 
                                    height="80px" 
                                    style={{"position": "absolute",
                                    "cursor": "move",
                                    left : x1,
                                    top :  y1,
                                    }}
                                    className="dragme" 
                                    onMouseDown={startDrag} 
                                    onMouseUp={stopDrag} 
                                    onMouseMove={dragDiv}
                                    onContextMenu={preventDefault}            
                                />);
                    })
                    }

                </div>
                {/* ProgressBars Code */}
                <div style={{"height": "0px"}}>
                    {PBS.map((progressBar) => {
                    if (progressBar === null) return 0
                    const id = progressBar.id
                    const V = progressBar.V
                    const x = progressBar.P.x
                    const y = progressBar.P.y
                    const progressAdder = getProgressAdder(id)
                    const progressReducer = getProgressReducer(id)
                    return (
                        <img 
                            id={"PB"+id}
                            src={progressBarImages[V]} key={id} alt="todo" 
                            height="45vh" 
                            style={{"position": "absolute",
                            "cursor": "move",
                            left : x,
                            top :  y,
                            }}
                            className="dragme" 
                            onClick={progressAdder}
                            onContextMenu={progressReducer} 
                            onMouseDown={startDrag} 
                            onMouseUp={stopDrag} 
                            onMouseMove={dragDiv}
                        />
                    );
                    })
                }
                </div>
                <img 
                    alt="Invalid"
                    src={combinedMaps[map][cipherNum]}
                    style={{}}
                    height={calculatedHeight}
                    onClick={spawnProgressBar}
                    onContextMenu={HandleRightClickOnTheMap}
                />
            </div>
        </div>
    );
}
function HandleRightClickOnTheMap(e) {
    e.preventDefault();
}

function preventDefault(e) {
    e.preventDefault();
}
export default MapSelect;