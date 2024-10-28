import { Image as ImageLib } from 'image-js'
// if i want to change the animation to always stick to time and have constate propogation speed i need to use C.time=Date.now()
// then calculate time difference and calulate how much R shuld be
// R = R + 6 => (R gets bigger 6 px each 1/60 of a second => V = 0.36 px/ms )
// the R used for the cirlce should be Rayon =  Speed * (Date.now() - C.time)
// this way it willl always be constate speed for all circles as animation will depend on the time the animation started from 
// all of the animations will take 1933.3ms to finish every time 
// speed of propogation can be set for every charcter... LOL probabily not

const CleanLayer = [];
const SurvivorSelected = [];
const SurvivorSelectedBG = [];
const BlackLinesGone = [];
const RedLinesGone = [];
const SurvivorBanned = [];

function importAll(r) {
  return r.keys().map(r);
}

const       cleanlayer = importAll(require.context('../images/layers/cleanlayer', false, /\.(png|jpe?g|svg)$/));
const survivorselected = importAll(require.context('../images/layers/survivorSelected', false, /\.(png|jpe?g|svg)$/));
const survivorselectedBG = importAll(require.context('../images/layers/survivorSelectedBG', false, /\.(png|jpe?g|svg)$/));
const   blacklinesgone = importAll(require.context('../images/layers/blacklinesgone', false, /\.(png|jpe?g|svg)$/));
const     redlinesgone = importAll(require.context('../images/layers/redlinesgone', false, /\.(png|jpe?g|svg)$/));
const   survivorbanned = importAll(require.context('../images/layers/survivorBanned', false, /\.(png|jpe?g|svg)$/));

function makeIdImagesArr(layerX){
  const images = [];
  layerX.forEach(filepath => {
    var img = new Image();
    img.src = filepath
    images.push({id: filepath,img: img});
  });
  return images
}

        CleanLayer.push(...makeIdImagesArr(cleanlayer));
  SurvivorSelected.push(...makeIdImagesArr(survivorselected));
SurvivorSelectedBG.push(...makeIdImagesArr(survivorselectedBG));
    BlackLinesGone.push(...makeIdImagesArr(blacklinesgone));
      RedLinesGone.push(...makeIdImagesArr(redlinesgone));
    SurvivorBanned.push(...makeIdImagesArr(survivorbanned));
 
const charctercolisionsmap = {
  "Coordinator":  {"id": "Coordinator",   "x1": 223, "x2": 269, "y1": 33,  "y2": 89, "R":5,"RR":5},
  "ToyMerchant":  {"id": "ToyMerchant",   "x1": 469, "x2": 513, "y1": 46,  "y2": 104,"R":5,"RR":5,"Maps": ["Sacred","Lakeside","Moonlit","Leos Memory","Eversleeping","Chinatown"]},
  "Composer":     {"id": "Composer",      "x1": 622, "x2": 665, "y1": 46,  "y2": 102,"R":5,"RR":5},
  "Aeroplanist":  {"id": "Aeroplanist",   "x1": 51,  "x2": 99,  "y1": 201, "y2": 257,"R":5,"RR":5},
  "Prospector":   {"id": "Prospector",    "x1": 147, "x2": 192, "y1": 201, "y2": 258,"R":5,"RR":5},
  "Antiquarian":  {"id": "Antiquarian",   "x1": 280, "x2": 322, "y1": 201, "y2": 255,"R":5,"RR":5},
  "Embalmer":     {"id": "Embalmer",      "x1": 387, "x2": 430, "y1": 161, "y2": 212,"R":5,"RR":5,"Maps": ["Lakeside","Moonlit","Leos Memory","Eversleeping","Chinatown"]},
  "Mechanic":     {"id": "Mechanic",      "x1": 550, "x2": 596, "y1": 169, "y2": 225,"R":5,"RR":5},
  "Lawyer":       {"id": "Lawyer",        "x1": 773, "x2": 821, "y1": 219, "y2": 277,"R":5,"RR":5,"Maps": ["Red Church","Sacred","Lakeside","Moonlit","Leos Memory","Eversleeping","Chinatown"]},
  "Acrobat":      {"id": "Acrobat",       "x1": 53,  "x2": 102, "y1": 337, "y2": 398,"R":5,"RR":5},
  "Patient":      {"id": "Patient",       "x1": 169, "x2": 211, "y1": 340, "y2": 393,"R":5,"RR":5,"Maps": ["Sacred","Lakeside","Moonlit","Leos Memory","Chinatown"]},
  "Psychologist": {"id": "Psychologist",  "x1": 280, "x2": 324, "y1": 341, "y2": 393,"R":5,"RR":5},
  "Priestess":    {"id": "Priestess",     "x1": 467, "x2": 512, "y1": 283, "y2": 340,"R":5,"RR":5,"Maps": ["Sacred","Moonlit","Leos Memory","Eversleeping","Chinatown"]},
  "Seer":         {"id": "Seer",          "x1": 623, "x2": 669, "y1": 283, "y2": 337,"R":5,"RR":5},
  "Explorer":     {"id": "Explorer",      "x1": 774, "x2": 820, "y1": 332, "y2": 387,"R":5,"RR":5,"Maps": ["Arms Factory","Sacred","Lakeside","Leos Memory","Eversleeping","Chinatown"]},
  "Wildling":     {"id": "Wildling",      "x1": 41,  "x2": 83,  "y1": 469, "y2": 524,"R":5,"RR":5},
  "Mercenary":    {"id": "Mercenary",     "x1": 170, "x2": 214, "y1": 472, "y2": 521,"R":5,"RR":5},
  "Forward":      {"id": "Forward",       "x1": 278, "x2": 328, "y1": 470, "y2": 521,"R":5,"RR":5},
  "Barmaid":      {"id": "Barmaid",       "x1": 398, "x2": 443, "y1": 469, "y2": 524,"R":5,"RR":5},
  "Entomologist": {"id": "Entomologist",  "x1": 569, "x2": 611, "y1": 472, "y2": 526,"R":5,"RR":5},
  "Dancer":       {"id": "Dancer",        "x1": 702, "x2": 745, "y1": 471, "y2": 524,"R":5,"RR":5},
  "FirstOfficer": {"id": "FirstOfficer",  "x1": 105, "x2": 149, "y1": 592, "y2": 646,"R":5,"RR":5},
  "Gravekeeper":  {"id": "Gravekeeper",   "x1": 279, "x2": 323, "y1": 595, "y2": 649,"R":5,"RR":5},
  // "Professor":    {"id": "Professor",     "x1": 398, "x2": 441, "y1": 593, "y2": 645,"R":5,"RR":5},  // <---- GONE 
  "Puppeteer":    {"id": "Puppeteer",     "x1": 572, "x2": 617, "y1": 615, "y2": 667,"R":5,"RR":5},
  "Gardener":     {"id": "Gardener",      "x1": 678, "x2": 723, "y1": 614, "y2": 670,"R":5,"RR":5},
  "Cheerleader":  {"id": "Cheerleader",   "x1": 787, "x2": 825, "y1": 615, "y2": 674,"R":5,"RR":5},
  "Novelist":     {"id": "Novelist",      "x1": 773, "x2": 821, "y1": 46,  "y2": 102,"R":5,"RR":5},
  
  "FireInvestigator": {"id": "FireInvestigator","x1": 480, "x2":520,  "y1": 607, "y2":676 ,"R":5,"RR":5},
  "WeepingClown":     {"id": "WeepingClown",    "x1": 385, "x2":420,  "y1": 607, "y2":676 ,"R":5,"RR":5},
  "FaroLady":         {"id": "FaroLady",        "x1": 130, "x2":172,  "y1": 31,  "y2":94  ,"R":5,"RR":5},
  "Knight":           {"id": "Knight",          "x1": 37,  "x2":76,   "y1": 31,  "y2":94  ,"R":5,"RR":5},

  "Professor":    {"id": "Professor",     "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Magician":     {"id": "Magician",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "LuckyGuy":     {"id": "LuckyGuy",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Doctor":       {"id": "Doctor",        "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Perfumer":     {"id": "Perfumer",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Painter":      {"id": "Painter",       "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "TME":          {"id": "TME",           "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Postman":      {"id": "Postman",       "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Enchantress":  {"id": "Enchantress",   "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Journalist":   {"id": "Journalist",    "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Prisoner":     {"id": "Prisoner",      "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},

  "LittleGirl":   {"id": "LittleGirl",    "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Cowboy":       {"id": "Cowboy",        "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Thief":        {"id": "Thief",         "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
  "Batter":       {"id": "Batter",        "x1": 0,   "x2":0,    "y1": 0,   "y2":0   ,"R":5,"RR":5},
}

//---------------------------------------- CCM Logic ----------------------------------------
export function resetCCM(){
  for (const Charcter in charctercolisionsmap){
    charctercolisionsmap[Charcter].state = 0;
    charctercolisionsmap[Charcter].R  = 5;
    charctercolisionsmap[Charcter].RR = 5;
  }
}

export function GetIdOfColission(event,CCM){
  const X = event.clientX;    
  const Y = event.clientY;
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
      if (X+10 < charcterData.x1 || X-10 > charcterData.x2 || Y+10 < charcterData.y1 || Y-10 > charcterData.y2) { continue }
      // console.log("hit on charcter id:",charcterData.id)
      return charcterData.id //C is the array entry (charcter) that was modified after the click event
  }
  console.log("X=",X," / Y=",Y)
  return 0
}
function LinkIdsAndLayers(CCM){
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
    for (const surv of CleanLayer){
        if (surv.id.includes(charcterData.id)) CCM[CharcterId].CleanLayerIMG = surv.img
    }
    for (const surv of SurvivorSelected){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorSelectedIMG = surv.img
    }
    for (const surv of SurvivorSelectedBG){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorSelectedBGIMG = surv.img
    }
    for (const surv of BlackLinesGone){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].BlackLinesGoneIMG = surv.img
    }
    for (const surv of RedLinesGone){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].RedLinesGoneIMG = surv.img
    }
    for (const surv of SurvivorBanned){
      if (surv.id.includes(charcterData.id)) CCM[CharcterId].SurvivorBannedIMG = surv.img
    }
  } 
  // console.log(CCM)
  return CCM
}
export const CCM = LinkIdsAndLayers(charctercolisionsmap);

const PropogationSpeed = {select:10, blacklines:10, redlines:6}

export function Draw_5_Selection_Layer_BG (Drawing_array,context, width, height){
  if (Drawing_array.length === 0) return
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData || !charcterData.SurvivorSelectedBGIMG) continue

    const img = charcterData.SurvivorSelectedBGIMG
    if (!img) continue
    if (charcterData.R<=700){
      DrawLayerWithCircleAnimation(charcterData,'R',img,context, width, height)
      charcterData.R = charcterData.R + PropogationSpeed.select
      }else{
      context.drawImage(img, 0, 0, width, height);
      charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
const DEFAULT_CHANGE = 0.03                     // 170hz => *60/170
const BUFFER_LIMIT = 0.5 * 60 // 0.5s 30frames // 170hz => *170/60
let opacity = 1.0
let change = - DEFAULT_CHANGE
let buffer = 0
export function loopOpacity(){
  if (buffer < BUFFER_LIMIT){
    buffer++;
    // console.log("Buffer not full")
  }else{
    // console.log("Opacity",opacity)
    opacity += change
    if ( opacity > 1) {
      change = - DEFAULT_CHANGE
    }
    if ( opacity < 0.5) {
      change = DEFAULT_CHANGE
      // console.log('change is ',change)
      // opacity = 1 // change =  DEFAULT_CHANGE
      change =  DEFAULT_CHANGE * 10
      buffer = (30-23)// 170hz => *170/60
    }
  }
}
export function resetOpacity(){
  opacity = 1
  change = - DEFAULT_CHANGE
  buffer = 0
}
export function freezeOpacity(){
  if ( opacity > 1){
    resetOpacity()
    return 1
  }
  change = DEFAULT_CHANGE
  loopOpacity()
  return 0
}
export function Draw_51_Selection_Layer (Drawing_array,context, width, height){
  if (Drawing_array.length === 0) return
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData || !charcterData.SurvivorSelectedIMG) continue

    const img = charcterData.SurvivorSelectedIMG
    if (!img) continue
    if (charcterData.R<=700){
    DrawLayerWithCircleAnimation(charcterData,'R',img,context, width, height)
    charcterData.R = charcterData.R + PropogationSpeed.select
    }else{
      context.globalAlpha = opacity
      context.drawImage(img, 0, 0, width, height);
      context.globalAlpha = 1
      charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_6_Clean_Hunter_Layer (Drawing_array,context,width,height){
  if (Drawing_array.length === 0) return
  //console.log("Clean Layer for => ",Drawing_array)
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    // console.log(charcterData)
    if (charcterData && !!charcterData.CleanLayerIMG ) context.drawImage(charcterData.CleanLayerIMG, 0, 0, width, height);
  }
}
export function Draw_7_Black_Lines_Gone_Layer (Drawing_array,context, width, height){
  if (Drawing_array.length === 0) return
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData  || !charcterData.BlackLinesGoneIMG) continue // else =>

    const img = charcterData.BlackLinesGoneIMG
    if (charcterData.R <= 700){
      DrawLayerWithCircleAnimation(charcterData,'R',img,context,width, height)
      charcterData.R = charcterData.R + PropogationSpeed.blacklines
    }else{
      context.drawImage(img, 0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
      charcterData.R = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_71_Red_Lines_Gone_Layer (Drawing_array,context,width, height){
  if (Drawing_array.length === 0) return
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (!charcterData  || !charcterData.RedLinesGoneIMG) continue // else =>

    const img = charcterData.RedLinesGoneIMG
    if (charcterData.RR <= 220){
        DrawLayerWithCircleAnimation(charcterData,'RR',img,context,width, height)
        charcterData.RR = charcterData.RR + PropogationSpeed.redlines
    }else{
      context.drawImage(img, 0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
      charcterData.RR = 850; //Animation is stoped and we jump to a high value to indicate the end
    }
  }
}
export function Draw_8_Banned_Charcters_Layer (Drawing_array,context,width, height){
  if (Drawing_array.length === 0) return
  for (const CharcterId of Drawing_array){
    const charcterData = CCM[CharcterId]
    if (charcterData && !!charcterData.SurvivorBannedIMG) context.drawImage(charcterData.SurvivorBannedIMG, 0, 0, width, height);
  }
}

function DrawLayerWithCircleAnimation(C,RayonPropertyToUse,img,context,width,height){
  context.save()
  context.beginPath();
  context.arc(C.x1/2+C.x2/2-6,C.y1/2+C.y2/2, C[RayonPropertyToUse], 0, Math.PI * 2);
  context.clip();
  context.drawImage(img, 0, 0, width, height);
  context.restore();
}

export function DrawLayerWithSelectedMask(charcterNames,img,context,width,height){
  context.save()
  context.beginPath();
  for (let i=0;i<4;i++){
    const CharcterName = charcterNames[i]
    if (CharcterName.length <=2 ) continue
    const C = CCM[CharcterName]
    context.moveTo(C.x1+50,C.y1);
    context.arc(C.x1,C.y1, 50, 0, Math.PI * 2);
    // context.strokeStyle = "#FF0000";
    // context.stroke();
  }
  context.clip();
  context.drawImage(img, 0, 0, width, height);
  context.restore();
}

export function AnimationNotOver(CCM){
  let restart = false
  for (const CharcterId in CCM){
    const charcterData = CCM[CharcterId]
    if (((charcterData.R<706 && charcterData.R!==850 && charcterData.R!==5) || (charcterData.RR<220 && charcterData.RR!==850 && charcterData.RR!==5 ))){
      restart = true
      break;
    }
  }
  return restart
}

//----------------------------------------- Hunter points calculations ---------------------------------------------------
function translateColour(value){
  return (value===250 && 100)||(value===143 && 50)||(value===18 && "X")||(value===242 && -100)||0
}
const internalHunterPoints = []
export async function CalculateHunterPoints(hunterPoints,HunterLayers,HunterPictureList,GlobalList){
  // const hunterPoints = [];
  for (const i in HunterPictureList){
    const Hunter = HunterPictureList[i]
    const split = Hunter.url.split("_");
    const layerId = split.length === 4 ? split[2] : -1;

    if (layerId === -1){ 
      // console.log("This hunter is not supported yet, No Canvas Layer will be drawn"); // not supported
      continue
    }
      const img = HunterLayers[layerId-1]
      const arr = []
        ImageLib.load(img.src).then((image) => {
          for (const CharcterId in CCM){
            const charcterData = CCM[CharcterId]
            //Hard coded Canvas Width & Height in this function along with some spacing.
            var pixelColor = image.getPixelXY(Math.floor(charcterData.x1 * image.width/850+10), Math.floor(charcterData.y1 *image.height/692+10));
            arr[GlobalList.getEquiv(CharcterId)] = translateColour(pixelColor[0])
          }
          hunterPoints[Hunter.id] = arr
          internalHunterPoints[Hunter.id]=[...arr]
        });
  }
  return hunterPoints
}

export function HunterPointsTotal(GlobalList){
  const hunterPoints = internalHunterPoints
  if (!GlobalList.isSurvsSelectionomplete()){
    return
  }
//Code for support functions
  const SelectedSurvivorsNames = GlobalList.getSelected()
  const isGoodOnMap = (survName)=>{
    const Map = GlobalList.getMapName()
    const survData = CCM[survName]
    return survData["Maps"].includes(Map)
  }
  const turnXtoPoints = (arr)=>{
    for (let i = 0; i < arr.length;i++){
      const survName = SelectedSurvivorsNames[i]
      if (arr[i] === "X") {
        arr[i] =  isGoodOnMap(survName)?100:0
      } 
    }
  }
//Main Code
  const SelectedSurvivorsIDs = GlobalList.getSelectedIDs()
  const result = []
  const X = GlobalList.getHunterIDsToIgnore()
    for (let i = 42;i <= hunterPoints.length;i++){
      const arr = hunterPoints[i]
      if (X.has(i)) continue      // hunter is ignored
      if (arr === undefined) continue // hunter has no layer (Clerk etc)
      const NewArr = [
        arr[SelectedSurvivorsIDs[0]],
        arr[SelectedSurvivorsIDs[1]],
        arr[SelectedSurvivorsIDs[2]],
        arr[SelectedSurvivorsIDs[3]]
      ]
      turnXtoPoints(NewArr)
      //check if it's weak enough  --------- Points Logic ----------
      if (count(NewArr,-100)>= 2 || (count(NewArr,-100) === 1 && count(NewArr,0) >= 1) || (count(NewArr,-100) === 1 && count(NewArr,50) >= 1) )
      result[i] = [
        NewArr.reduce((total, item) => total + item) + ((count(NewArr,-100) >= 2)?-50:0),
        NewArr,  
      ]
      // if (count(NewArr,-100) >= 2) result[i] -= 50 //if 2 charcteres are red then the whole team is significantly weaker
    }
  // console.log("%c Result points is => ","color:red",result)
  OrderedResult(result,GlobalList)
  return result
}

function OrderedResult(result,GlobalList){
  const oResult = []
  // console.log("i'm using ths to calculate the ordered list",result)
  for (let i = 42;i <= result.length;i++){
    if(!result[i]) continue
    const temp = result[i]
    oResult.push({name: GlobalList.getEquiv(i),id: i, totalPoints: temp[0],Points : temp[1]})
  }
  oResult.sort((a, b)=> {
    if (a.totalPoints <= b.totalPoints ) {
      return -1;
    } else  {
      return 1;
    }
  })
  GlobalList.HunterPoints = oResult
  return oResult
}
function count(Array,val){
  const elementCounts = {};
  Array.forEach(element =>   elementCounts[element] = (elementCounts[element] || 0) + 1);
  // if (!elementCounts[val]) console.log("Value specified : ",val ,"is not existant")
  return elementCounts[val]
}
