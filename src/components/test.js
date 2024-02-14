// This file contains random function copied and pasted so i can edit them here until everything makes sense
// Then copy them back
function UpdateColissionCharcterMap(event,CCM){
    const X = event.clientX;    
    const Y = event.clientY;
    let val=0
    if (event.type === 'click')      { val =  1;                         }
    if (event.type === 'contextmenu'){ val = -1; event.preventDefault(); }
    for (const C of CCM){
        if (X+10 < C.x1 || X-10 > C.x2 || Y+10 < C.y1 || Y-10 > C.y2) { continue }
        console.log("hit on charcter id:",C.id)
        C.state = C.state + val 
        if (C.state===-3||C.state===2){
            C.state = C.state - val 
            console.log("charcter id:",C.id, (C.state===1?" Already Selected":""),(C.state===-2?" Already Removed":"")," => No  Action")
            return -1
        }
        switch(C.state){
            case  1:
                  console.log("charcter id:",C.id, " Nothing => SELECTED")
                        C.selected= true;  C.banned = false; C.removed = false; break; 
            case  0: 
                  console.log("charcter id:",C.id, (val<0 ? "Selected" : "Banned"), " => Nothing")
                  C.R=5;C.selected= false; C.banned = false; C.removed = false; break;
            case -1: 
                  console.log("charcter id:",C.id, (val<0 ? "Nothing" : "Removed"), " => Nothing")
                        C.selected= false; C.banned = true;  C.removed = false; break;
            case -2: 
                  console.log("charcter id:",C.id, " is BANNED   => it will be set to REMOVED")
                        C.selected= false; C.banned = false;  C.removed = true;  break;            
            default: break;
        }
          return C
    }
    console.log("no hit on ANY charcter !!")
    return 0
  }


  function UpdateColissionCharcterMap2(event,CCM){
    const X = event.clientX;    
    const Y = event.clientY;
    let val=0
    if (event.type === 'click')      { val=1                              }
    if (event.type === 'contextmenu'){ val = -1; event.preventDefault();  }
  
    for (const C of CCM){
        if (X+10<C.x1 || X-10>C.x2 || Y+10 <C.y1 || Y-10 >C.y2) { continue }
        console.log("hit on charcter id:",C.id)
        C.state = C.state + val 
        if (C.state===-2){
            console.log("charcter id:",C.id, (C.state===1?" was Selected":""),(C.state===-2?" was Removed":"")," => No  Action")
            return C
        }
        if (val===-1){
          switch(C.state){
              case  0: 
                  console.log("charcter id:",C.id, " was SELECTED   => Selection is cleared")
                  C.R=5; C.selected= false; C.banned = false; C.removed = false; break;
              case -1: 
                  console.log("charcter id:",C.id, " is not BANNED   => it will be set to BANNED")
                          C.selected= false; C.banned = true; C.removed = false; break;
              case -2: 
                  console.log("charcter id:",C.id, " is BANNED   => it will be set to REMOVED + BANNED")
                          C.selected= false; C.banned = false; C.removed = true; break;
              default: break;
          }
          return C
        }
        if (val===1){
          switch(C.state){
            //case  1: C.selected= true; C.banned = false; C.removed = false; break;
            case  1:
                console.log("charcter id:",C.id, " was nothing   => it will be set to SELECTED")
                        C.selected= true; C.banned = false; C.removed = false; break;          
            case  0: 
                console.log("charcter id:",C.id, " was Selected   => Selection is cleared")
                C.R=5; C.selected= false; C.banned = false; C.removed = false; break;
            case -1: 
                console.log("charcter id:",C.id, " is not banned   => it will be set to BANNED")
                        C.selected= false; C.banned = true; C.removed = false; break;
            default: break;
          }
          return C
        }   
    }
    console.log("no hit on ANY charcter !!")
    return null
  }

  const handleCanvasClick =(event)=>{ // C : charcter
    if (event.type === 'contextmenu') event.preventDefault();
    let val = 0;
    if (event.type === 'click')       {  val =  1; console.log('Left click Detected') ;}
    if (event.type === 'contextmenu') {  val = -1; console.log('Right click Detected');}

    const CharcterHitID = GetIdOfColission(event,CCM);
    if (CharcterHitID === 0) return
    // CharcterHitID && updateMapById(event,CharcterHitID.id,CCM)
    const charcterData = CCM[CharcterHitID]
    
    // charcterData.state = charcterData.state + val 
    // if (charcterData.state===-3||charcterData.state===2){
    //     charcterData.state = charcterData.state - val
    //     console.log("charcter id:",charcterData.id, (charcterData.state===1?" Already Selected":""),(charcterData.state===-2?" Already Removed":"")," => No  Action")
    //     return 0;
    // }
  }