import React, { useState, useReducer } from "react";
//import Draggable from "./Draggable";

function importAll(r) {
    return r.keys().map(r);
}

const arms = importAll(require.context('../images/maps/arms', false, /\.(png|jpe?g|svg)$/));
const chinatown = importAll(require.context('../images/maps/chinatown', false, /\.(png|jpe?g|svg)$/));
const church = importAll(require.context('../images/maps/church', false, /\.(png|jpe?g|svg)$/));
const eversleeping = importAll(require.context('../images/maps/eversleeping', false, /\.(png|jpe?g|svg)$/));
const hospital = importAll(require.context('../images/maps/hospital', false, /\.(png|jpe?g|svg)$/));
const lakeside = importAll(require.context('../images/maps/lakeside', false, /\.(png|jpe?g|svg)$/));
const leos = importAll(require.context('../images/maps/leos', false, /\.(png|jpe?g|svg)$/));
const moonlit = importAll(require.context('../images/maps/moonlit', false, /\.(png|jpe?g|svg)$/));

const combinedMaps = [arms, chinatown, church, eversleeping, hospital, lakeside, leos, moonlit];

var drag=false;
var targ=undefined;
var coordX=0;
var coordY=0;
var offsetX=0;
var offsetY=0;

function MapSelect(props) {
    const GlobalList = props.globalList;
    const [map, setMap] = useState(0);
    const [cipherNum, setCipherNum] = useState(0);
    const [, update] = useReducer(x => x+1, 0); // to update when clicking

    const handleMapChange = (e) => {
        setMap(e.target.value);
        GlobalList.Map = e.target.value;
    };

    const increaseCipherNum = (e) => {
        setCipherNum(cipherNum+1);
        if (cipherNum === combinedMaps[map].length-1)
        {
            setCipherNum(1)
        }
    }

    const decreaseCipherNum = (e) => {
        setCipherNum(cipherNum-1);
        if (cipherNum === 1)
        {
            setCipherNum(combinedMaps[map].length-1)
        }
    }

    const resetCipherNum = (e) => {
        setCipherNum(0);
    }

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
    
        // assign default values for top and left properties
        // if(GlobalList[targ.id]?.left){
        //     targ.style.left = GlobalList[targ.id].left
        //     targ.style.top = GlobalList[targ.id].left
        //     delete GlobalList[targ.id].left
        //     delete GlobalList[targ.id].left
        // }else{
            if(!targ.style.left) { targ.style.left='0px'};
            if (!targ.style.top) { targ.style.top='0px'};
        // }
    
    
        // calculate integer values for top and left 
        // properties
        // const X = GlobalList.getIdCoords1(e.target.id)[0]? GlobalList.getIdCoords1(e.target.id)[0] : "0px"
        // const Y = GlobalList.getIdCoords1(e.target.id)[1]? GlobalList.getIdCoords1(e.target.id)[1] : "0px"
        coordX = parseInt(targ.style.left);
        coordY = parseInt(targ.style.top);

        drag = true;
    
        // move div element
        //document.onmousemove=dragDiv;
        return false;
    }
    function dragDiv(e) {
        if (!drag) {return};
        if (!e) { e = window.event};
        // var targ=e.target?e.target:e.srcElement;
        // move div element
        targ.style.left = coordX+e.clientX-offsetX+'px';
        targ.style.top  = coordY+e.clientY-offsetY+'px';
        if (e.target.id!=="") GlobalList.tempPositions[e.target.id] = [coordX+e.clientX-offsetX+'px',coordY+e.clientY-offsetY+'px']

        return false;
    }
    function stopDrag() {
        drag=false;
    }


    // Draging Logic Ending
    return (
        <div style={mapselect} onMouseMove={dragDiv}>
            {/* {console.log('%c Map Object Re rendered',"color:red;")} */}
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
            <label style={texte}> Ciphers: </label>
            <button style={button} onClick={decreaseCipherNum}>-</button>
            <label style={texte}> {cipherNum} </label>
            <button style={button} onClick={increaseCipherNum}>+</button>
            <label style={{marginLeft:"10px"}}> </label>
            <button style={button} onClick={resetCipherNum}>All In</button>
            <div>
            <div style={{"height": "0px"}}>
                {props.globalList.getMapCharcters().map((id) => {
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
                            onContextMenu={deletePic} 
                        />
                    );
                })
                }
            </div>
            <img 
                alt="Invalid"
                src={combinedMaps[map][cipherNum]}
                style={{}}
                height="450vh"
                onClick={update} />
            </div>
        </div>
    );
}

function deletePic(e) {
    e.preventDefault();
    // targ.style.visibility="hidden";
}
export default MapSelect;