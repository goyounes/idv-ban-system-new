import React, { useState, useReducer } from "react";
//import Draggable from "./Draggable";

function importAll(r) {
    return r.keys().map(r);
}

const InjuredState = importAll(require.context('../images/survivors/InjuredState', false, /\.(png|jpe?g|svg)$/));
const InjuredStateList = [];
var i=0;
InjuredState.forEach(filename => {
    InjuredStateList.push({id: i, url: filename});
    i++;
});
// const ChairedState = importAll(require.context('./images/survivors/ChairedState', false, /\.(png|jpe?g|svg)$/));
// const ChairedStateList = [];
// i = 0;
// ChairedState.forEach(filename => {
//     ChairedStateList.push({id: i, url: filename});
//     i++;
// });

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
    const GlobalList = props.globalList;
    const progressBars = GlobalList.progressBars
    const [map, setMap] = useState(0);
    const [cipherNum, setCipherNum] = useState(GlobalList.cipherLayout);
    const [, update] = useReducer(x => x+1, 0); // to update when clicking

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
        if (e.target.id!=="") GlobalList.tempPositions[e.target.id] = [coordX+e.clientX-offsetX+'px',coordY+e.clientY-offsetY+'px']
        drag=false;
    }

    // Draging Logic Ending


    function spawnProgressBar(e){
        progressBars.push({id:progressBars.length,value: 1,position:{x:e.clientX-100,y:e.clientY-20}})
        update()
    }

    function getProgressAdder(id,e){
        // console.log("this creates a function that will be used to increase the progress when progress bar N:",id,"is clicked")
        return (e)=>{
            // console.log(`BEFORE: the prgoress bar N° ${id} ${progressBars[id].value}0% cipher progress `)
            progressBars[id].value++
            if (e.shiftKey) progressBars[id].value++
            if (progressBars[id].value===11) progressBars[id].value = 0
            // console.log(`AFTER: the prgoress bar N° ${id} ${progressBars[id].value}0% cipher progress `)
            const imgElement = document.getElementById("ProgressBar"+id);
            imgElement.src = progressBarImages[progressBars[id].value]
        }
    }    
    function getProgressReducer(id,e){
        // console.log("this creates a function that will be used to decrease the progress when progress bar N:",id,"is clicked")
        return (e)=>{
            e.preventDefault()
            //Delte Bar if shift was held while Right Clicking
            if (e.ctrlKey) {
                console.log("shift was pressed")
                targ.style.visibility="hidden";
                progressBars[id]=null
                return
            }

            progressBars[id].value--;
            if (e.shiftKey) progressBars[id].value--
            if (progressBars[id].value===-1) progressBars[id].value = 0
            const imgElement = document.getElementById("ProgressBar"+id);
            imgElement.src = progressBarImages[progressBars[id].value]
        }
    }
    
    function srcCyclerMaker(id){
        if (id > 41) return (e)=>{e.preventDefault()} 
        const sources = [props.PictureList[id].url]
        sources.push(InjuredStateList[id].url)
        function nextIndex (array,index){
            if (index < sources.length - 1) return (index+1)
            return 0
        }
        // sources.push(ChairedStateList[id].url)
        // console.log("this creates a function that will be cycle through all different Srcs for one image")
        return (e)=>{
            e.preventDefault();
            // console.log(`BEFORE: the prgoress bar N° ${id} ${progressBars[id].value}0% cipher progress `)
            const imgElement = document.getElementById(id)
            const currenti = imgElement.srcindex || 0
            const Nexti = nextIndex(sources,currenti)
            imgElement.src = sources[Nexti];
            imgElement.srcindex = Nexti
        }
    }

    
    return (
        <div style={mapselect} onMouseMove={dragDiv}>
            {/* {mconsole.log('%c Map Object Re rendered',"color:red;")} */}
            <br></br>
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
            <button style={button} onClick={resetCipherNum}>All In</button>
            <div>
                {/* Survivor and Hunter charecters Code */}
                <div style={{"height": "0px"}}>
                    {props.globalList.getMapCharcters().map((id) => {
                        const srcCycler = srcCyclerMaker(id)
                        const [x,y] = GlobalList.getIdCoords(id)
                        let  [x1,y1]= GlobalList.getIdCoords1(id)
                        if (x1 === null || y1 === null){
                            x1 = ""; y1 = "";  
                            // console.log("used Nothing for X1 Y1 because  they dont exist"); 
                        }
                        return (
                            <img 
                                id={id}
                                src={props.PictureList[id].url} key={id} alt="todo" 
                                height="80px" 
                                style={{"position": "relative",
                                "cursor": "move",
                                left : x===null? x1 :x,
                                top :  y===null? y1 :y,
                                }}
                                className="dragme" 
                                onMouseDown={startDrag} 
                                onMouseUp={stopDrag} 
                                onMouseMove={dragDiv}
                                onContextMenu={srcCycler} 
                            />
                        );
                    })
                    }
                </div>
                {/* ProgressBars Code */}
                <div style={{"height": "0px"}}>
                    {progressBars.map((progressBar) => {
                    if (progressBar === null) return 0
                    const id = progressBar.id
                    const value = progressBar.value
                    const x = progressBar.position.x
                    const y = progressBar.position.y
                    const progressAdder = getProgressAdder(id)
                    const progressReducer = getProgressReducer(id)
                    return (
                        <img 
                            id={"ProgressBar"+id}
                            src={progressBarImages[value]} key={id} alt="todo" 
                            height="50vh" 
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
// function deletePic(e) {
//     e.preventDefault();
//     targ.style.visibility="hidden";
// }
export default MapSelect;