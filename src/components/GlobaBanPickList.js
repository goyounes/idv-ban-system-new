class GlobaBanPickList {
  constructor(){
    this.Map =  0 ;// Arms factory by default
    this.cipherLayout = 0;
    this.value=["0","1","2","3","4","5","6","7","8",  "9","10",  "11","12",  "13",  "14",  "15",  "16"];
    this.Round = 1;
    this.AB1 = "";
    this.AB2 = "";
    this.AS1 = "";
    this.AS2 = "";
    this.hunterSelect = "";
    this.hunterBan1  =-1;
    this.hunterBan2  =-1;
    this.hunterBan3  =-1;
    this.hunterSlot0 =-1;
    this.hunterSlot1 =-1;
    this.hunterSlot2 =-1;
    this.hunterSlot3 =-1;
    this.hunterSlot4 =-1;
    this.ignoredHunters = {}
    this.Positions = {}
    this.tempPositions = {}
    this.HunterPoints = []
    this.PBS = []
    this.bigMap = false

  }

  mapSizeToggler(){
    switch (this.bigMap) {
      case false:
        this.bigMap = true ;
        break;
      case true:
        this.bigMap = false ;
        break;
      default:
    }
  }
  getIdCoords (id){
    if (this.Positions[id] === undefined){
      return [null,null]
    }
    const result = this.Positions[id]
    this.Positions[id] = undefined
    return result
  }
  // you can probabily clean this.
  getIdCoords1 (id){
    if (this.tempPositions[id] === undefined) return [null,null]
    return this.tempPositions[id]
  }
  getSrcIndex (id){
    if (this.tempPositions[id] === undefined) return 0
    return this.tempPositions[id][2]
  }

  //Save/Load, NextRound/PreviousRound, Export/Import functionality
  saveRoundData(){
    // eslint-disable-next-line
    const exportArray = [
      [this.Map,this.cipherLayout],
      this.value,
      this.Round,
      [this.AB1,this.AB2,this.AS1,this.AS2],
      [this.hunterSelect,this.hunterSlot0,this.hunterSlot1,this.hunterSlot2,this.hunterSlot3,this.hunterSlot4],
      [this.hunterBan1, this.hunterBan2, this.hunterBan3],
      structuredClone(this.tempPositions),
      structuredClone(this.PBS),
      this.bigMap,
    ]; 
    console.log("exported array element n7 is = ")
    console.log(exportArray)
    console.log(this.PBS)
    return exportArray // change the export 
  }
  restoreRoundData(arr){
    if (!arr) return 0
    this.Map = arr[0][0];
    this.cipherLayout = arr[0][1]
    this.value = [...arr[1]];
    this.Round = arr[2];
    this.AB1 = arr[3][0];
    this.AB2 = arr[3][1];
    this.AS1 = arr[3][2];
    this.AS2 = arr[3][3];
    this.hunterSelect = arr[4][0];
    this.hunterSlot0 = arr[4][1];
    this.hunterSlot1 = arr[4][2];
    this.hunterSlot2 = arr[4][3];
    this.hunterSlot3 = arr[4][4];
    this.hunterSlot4 = arr[4][5];
    this.hunterBan1  = arr[5][0];
    this.hunterBan2  = arr[5][1];
    this.hunterBan3  = arr[5][2];
    // this.Positions = arr[6];

    this.tempPositions = structuredClone(arr[6]);
    this.PBS.splice(0,this.PBS.length) 
    this.PBS.push(...arr[7])
    this.bigMap=arr[8]
  }
  NextRound (){// (0) 
    // Save the state of this round in a variable called X="Round"+this.round+"Data"
    if (this.Round === 6) return // No Round after 6th round (OverTime)
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName]=this.saveRoundData()
    const nextRoundName = `Round${this.Round+1}Data`
    const nextRoundData = this[nextRoundName]

    if (nextRoundData!==undefined){
      const overWrite = window.confirm("Overwrite Next Round data ? Cancel will load Next Round Data directly");
      if (!overWrite){ 
        this.restoreRoundData(nextRoundData);
        return 1
      }
    }
    this.bigMap=false;
    this.Round++;
    const oldRemoved = this.getRealRemoved();
    console.log("Before we go to next round the removed charecters as of now are : ",oldRemoved)
    const permBan1 = this.value[11];// First  Selected Charecter
    const permBan2 = this.value[12];// Second Selected Charecter
    const permBan3 = this.value[14];// Third  Selected Charecter
    this.Clear();
    for (let i=0;i < oldRemoved.length;i++){
      this.value[i] = oldRemoved[i]
    }
    console.log("Old removed -->",permBan1, permBan2, permBan3)
    if (this.Round-1<=3){
      if (permBan1!=="11")  this.value[(this.Round-2)*3+0] = permBan1 ;
      if (permBan2!=="12")  this.value[(this.Round-2)*3+1] = permBan2 ;
      if (permBan3!=="14")  this.value[(this.Round-2)*3+2] = permBan3 ;
    }
    console.log("value -->",this.value)
    return 1 
  }
  PreviousRound(){
    // this.Round
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName] = this.saveRoundData()
    const roundName = `Round${this.Round-1}Data`
    this.restoreRoundData(this[roundName])
  }
  
  importList(JSONtext){
    if (JSONtext.length<30) return 0
    const JSONtext3 = JSONtext.replaceAll("||", '')
    const JSONtext2 = JSONtext3.replaceAll("ProgressBar", 'PB')
    const JSONtext1 = JSONtext2.replaceAll("value", 'V').replaceAll("position", 'P')
    let arrays = JSON.parse(JSONtext1)
    console.log("Imported Globalist is =>",arrays)
    for (let i = 1 ; i <=6;i++){
      if (arrays[i-1]===null) continue
      const roundName = `Round${i}Data`;
      this[roundName] = arrays[i-1];
    }
    for (let i = 1 ; i <=6;i++){
      if (arrays[i-1]===null) continue
      this.restoreRoundData(arrays[i-1])
      return 1
    }
  }
  exportList(){
    // save current round
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName] = this.saveRoundData();
    // start adding rounds to the exported array
    const exportArrays = []
    for (let i = 1 ; i <= 6 ; i++){
      const roundName = `Round${i}Data`;
      exportArrays.push(this[roundName]);
    }
    // write the exported array to the clipboard directly.
    navigator.clipboard.writeText("||"+JSON.stringify(exportArrays)+"||");
    console.log("Exported Globalist is =>",exportArrays)
    return exportArrays // change the export 
  }

  // importOneRound(JSONtext){
  //   if (JSONtext.length<30) return 0
  //   let arr = JSON.parse(JSONtext)
  //   console.log("Imported Globalist is =>",arr)
  //   this.Map = arr[0][0];
  //   this.value = [...arr[1]];
  //   this.Round = arr[2];
  //   this.AB1 = arr[3][0];
  //   this.AB2 = arr[3][1];
  //   this.AS1 = arr[3][2];
  //   this.AS2 = arr[3][3];
  //   this.hunterSelect = arr[4][0];
  //   this.hunterSlot0 = arr[4][1];
  //   this.hunterSlot1 = arr[4][2];
  //   this.hunterSlot2 = arr[4][3];
  //   this.hunterSlot3 = arr[4][4];
  //   this.hunterSlot4 = arr[4][5];
  //   this.hunterBan1  = arr[5][0];
  //   this.hunterBan2  = arr[5][1];
  //   this.hunterBan3  = arr[5][2];
  //   this.Positions = arr[6];
  //   this.tempPositions = structuredClone(arr[6]);
  // }
  // exportCurrentRound(){
  //   // eslint-disable-next-line
  //   const exportArray = [
  //     [this.Map,this.MapName(this.Map)],
  //     this.value,
  //     this.Round,
  //     [this.AB1,this.AB2,this.AS1,this.AS2],
  //     [this.hunterSelect,this.hunterSlot0,this.hunterSlot1,this.hunterSlot2,this.hunterSlot3,this.hunterSlot4],
  //     [this.hunterBan1, this.hunterBan2, this.hunterBan3],
  //     this.tempPositions
  //   ]; 
  //   navigator.clipboard.writeText(JSON.stringify(exportArray));
  //   console.log("Exported Globalist is =>",exportArray)
  //   return exportArray // change the export 
  // }

  Clear (){
    let arr = []
    for (let k=0;k<17;k++){
      arr[k] = String(k);
    }
    this.cipherLayout = 0;
    this.value = arr
    this.AB1 = "";
    this.AB2 = "";
    this.AS1 = "";
    this.AS2 = "";
    this.hunterSelect = "";
    this.hunterBan1  =-1;
    this.hunterBan2  =-1;
    this.hunterBan3  =-1;
    this.hunterSlot0 =-1;
    this.PBS.splice(0,this.PBS.length) 
    // this.Positions = {}
    this.tempPositions = {}
    return 1;
  }


  layerID(url){
    if (!url) return -1
    const split = url.split("_");
    const layerId = split.length === 4 ? split[2] : -1;
    return layerId;
  }

  //Survivor Selection and Ban Data
  addSelect (id){
    if(this.isSelected(id)) return 0 
    this.removeBan(id)
    this.removeRemoved(id)
    //Insert logic to check if value exists already to skip this step
    const array = this.value
    if (array[11]==="11"){
      array[11]=id
    } else if (array[12]==="12"){
      array[12]=id
    } else if (array[14]==="14"){
      array[14]=id
    } else if (array[16]==="16"){
      array[16]=id
    } else{
      console.log("4 Charcters already SELECTED")
      return 0
    }
    return 1
  }
  addBan (id) {
    if(this.isBanned(id)) return 0
    this.removeSelect(id);
    this.removeRemoved(id);
    const array = this.value
    if (array[9]==="9"){
      array[9]=id
      this.value = array; 
    } else if (array[10]==="10"){
      array[10]=id
      this.value = array;
    } else if (array[13]==="13"){
      array[13]=id
      this.value = array;
    } else if (array[15]==="15"){
      array[15]=id
      this.value = array;
    } else{
      console.log("4 Charcters already BANNED")
      this.value = array; return 0
    }
    return 1
  }
  addRemoved (id){
    if(this.isRemoved(id)) return 0
    this.removeSelect(id);
    this.removeBan(id);
    
    const array = this.value
    const nbr_Removed = 3 * this.Round - 3
    for (let k=0; k<nbr_Removed; k++){
      console.log("array[k]===String(k)",array[k],String(k))
        if (array[k] === String(k)){
            array[k] = id;
            this.value = array; 
            return 1
        }
    }
    console.log("9 Charcters already REMOVED, it will be added to a bonus array")
    array.push(id)
    this.value = array
    return 1
  }
  removeSelect (id){
    const array = this.value
    if (array[11]===id){
        array[11]="11";
        this.value = array; 
        return 1
    } else if (array[12]===id){
        array[12]="12";
        this.value = array; 
        return 1
    } else if (array[14]===id){
        array[14]="14";
        this.value = array; 
        return 1
    } else if (array[16]===id){
      array[16]="16";
        this.value = array; 
        return 1
    } else{
      // console.log("Charcter was not Selected");
      this.value = array; 
      return 0
    }
  }
  removeBan (id){
    const array = this.value
    if (array[9]===id){
      array[9]="9";
      this.value = array; 
      return 1
    } else if (array[10]===id){
      array[10]="10";
      this.value = array; 
      return 1
    } else if (array[13]===id){
      array[13]="13";
      this.value = array; 
      return 1
    } else if (array[15]===id){
      array[15]="15";
      this.value = array; 
      return 1
    } else{
      // console.log("Charcter was not Banned");
      this.value = array; 
      return 0
    }
  }
  removeRemoved(id){
    const array = this.value
    for (let k=0;k<9;k++){
        if (array[k]===id){
            array[k]=String(k);
            this.value = array; 
            return 1
        }
    }
    if(array.length > 17){
      for (let k = 17;k < array.length;k++){
        if (array[k]===id){
          array.splice(k,1)
          this.value = array; 
          return 1
        }
      }
    }
    // console.log("Charcter was not Removed")
    this.value = array
    return 0
  }

  //Hunter Selection and Ban Data
  addHunterBan(id){
    if (this.hunterBan1 ===-1 && this.Round >1){
      this.hunterBan1 = id; 
      return 1;
    }else if(this.hunterBan2 === -1 && this.Round >2){
      this.hunterBan2 = id; 
      return 1;
    }else if(this.hunterBan3 === -1 && this.Round >3){
      this.hunterBan3 = id; 
      return 1;
    }else{
      console.log("Hunter was not Banned")
      return 0;
    }
  }
  removeHunterBan(id){
    if (this.hunterBan1 === id){
      this.hunterBan1 = -1; return 1;
    }else if(this.hunterBan2 === id){
      this.hunterBan2 = -1; return 1;
    }else if(this.hunterBan3 === id){
      this.hunterBan3 = -1; return 1;
    }else{
      console.log("3 Hunters already Banned")
      return 0
    }
  }
  isHunterUsed(id){
    if (this.hunterBan1 === id) return true;
    if (this.hunterBan2 === id) return true;
    if (this.hunterBan3 === id) return true;
    if (this.hunterSlot0 === id) return true;
    if (this.hunterSlot1 === id) return true;
    if (this.hunterSlot2 === id) return true;
    if (this.hunterSlot3 === id) return true;
    if (this.hunterSlot4 === id) return true;
    console.log("Hunter is not used")
    return 0
  }

  //Reading from the Ban Selection Data --> for drawing mainly
  getSelected (){ return [this.value[11],this.value[12],this.value[14],this.value[16]] }
  getSelectedIDs (){  return [this.getEquiv(this.value[11]),this.getEquiv(this.value[12]),this.getEquiv(this.value[14]),this.getEquiv(this.value[16])]  }
  getBanned (){ return  [this.value[9],this.value[10],this.value[13],this.value[15]]  }
  getRealRemoved (){
    const arr = this.value;
    const result = [];
    for (let i=0;i<9;i++){
      // if (arr[i]===String(i)) return result;
      result.push(arr[i]);
    }
    return  result
  }
  getMoreRemoved(){
    if (this.value.length<=14) return []
    const arr = []
    for (let k = 17; k < this.value.length; k++){
      arr.push(this.value[k])
    }
    return arr 
  }
  getRemoved (){
    // return  [...getRealRemoved,...this.getMoreRemoved()]
    return  [this.value[0],this.value[1],this.value[2],this.value[3],this.value[4],this.value[5],this.value[6],this.value[7],this.value[8],...this.getMoreRemoved()]
  }
  getBannedRemoved(){
    // return  [...getBanned,...getRealRemoved,...this.getMoreRemoved()]
    return  [this.value[9],this.value[10],this.value[13],this.value[15],  this.value[0],this.value[1],this.value[2],this.value[3],this.value[4],this.value[5],this.value[6],this.value[7],this.value[8],...this.getMoreRemoved()]
  }

  //Reading from the Ban Selection Data --> Check information on a charecter
  findId(id,array){
    for (let i = 0; i < array.length; i++){
      if (array[i]===id) return true
    }
    return false
  }
  isSelected(id){ return this.findId(id,this.getSelected()) }
  isBanned(id){   return this.findId(id,this.getBanned())   }
  isRemoved(id){  return this.findId(id,this.getRemoved())  }
  idExist(id){    return this.findId(id,this.value)         }
  isSurvsSelectionomplete (){
    if (this.value[11]==="11")   return false
    if (this.value[12]==="12")   return false
    if (this.value[14]==="14")   return false
    if (this.value[16]==="16")   return false
    return true
  }
  isONEsurvSelecteded (){
    if (this.value[11]!=="11")   return true
    if (this.value[12]!=="12")   return true
    if (this.value[14]!=="14")   return true
    if (this.value[16]!=="16")   return true
    return false
  }

  //Reading from the Ban Selection Data --> To add pictures on the map as move-able <img> elements
  getMapCharcters(){
    const result = [null,null,null,null,null]
    if (this.hunterSelect!=="")  result[0] = ( this.getEquiv(this.hunterSelect))
    if (this.value[11]!=="11")   result[1] = ( this.getEquiv(this.value[11]) )
    if (this.value[12]!=="12")   result[2] = ( this.getEquiv(this.value[12]) )
    if (this.value[14]!=="14")   result[3] = ( this.getEquiv(this.value[14]) )
    if (this.value[16]!=="16")   result[4] = ( this.getEquiv(this.value[16]) )          
    return result
  }  

  //used to ignore hunters for the RISK calculations.
  getHunterIDsToIgnore(){
    const res = new Set([
      Number(this.hunterBan1),
      Number(this.hunterBan2),
      Number(this.hunterBan3),
    ])
    for (const key in this.ignoredHunters){
      if (this.ignoredHunters[key]!==null) res.add(Number(key))
    }
    res.delete(-1)
    return res
  }
  //Rolend's Old Function, Switched by getEquiv which needs to be updated everytime ID's change.
  // getName(filename) {
  //   const split1 = filename.split("_");
  //   if (split1.length < 1) return "";
  //   const split2 = split1[1].split(".");
  //   return split2[0];
  // }
  getEquiv (id) { 
    const C = {
      0:"Mercenary",                 "Mercenary":0,
      1:"FirstOfficer",              "FirstOfficer":1,
      2:"Wildling",                  "Wildling":2,
      3:"Coordinator",               "Coordinator":3,
      4:"Gravekeeper",               "Gravekeeper":4,
      5:"Forward",                   "Forward":5,
      6:"Puppeteer",                 "Puppeteer":6,
      7:"Gardener",                  "Gardener":7,
      8:"Perfumer",                  "Perfumer":8,
      9:"Magician",                  "Magician":9,
      10:"Novelist",                 "Novelist":10,
      11:"Prisoner",                 "Prisoner":11,
      12:"Seer",                     "Seer":12,
      13:"Acrobat",                  "Acrobat":13,
      14:"Aeroplanist",              "Aeroplanist":14,
      15:"Patient",                  "Patient":15,
      16:"WeepingClown",             "WeepingClown":16,
      17:"FireInvestigator",         "FireInvestigator":17,
      18:"Antiquarian",              "Antiquarian":18,
      19:"Prospector",               "Prospector":19,
      20:"Cheerleader",              "Cheerleader":20,
      21:"Psychologist",             "Psychologist":21,
      22:"Barmaid",                  "Barmaid":22,
      23:"Knight",                   "Knight":23,
      24:"Dancer",                   "Dancer":24,
      25:"Priestess",                "Priestess":25,
      26:"Entomologist",             "Entomologist":26,
      27:"Embalmer",                 "Embalmer":27,
      28:"ToyMerchant",              "ToyMerchant":28,
      29:"Professor",                "Professor":29,
      30:"Lawyer",                   "Lawyer":30,
      31:"Explorer",                 "Explorer":31,
      32:"Composer",                 "Composer":32,
      33:"Mechanic",                 "Mechanic":33,
      34:"TME",                      "TME":34,
      35:"Postman",                  "Postman":35,
      36:"Painter",                  "Painter":36,
      37:"FaroLady",                 "FaroLady":37,
      38:"Doctor",                   "Doctor":38,
      39:"Journalist",               "Journalist":39,
      40:"Enchantress",              "Enchantress":40,
      41:"LuckyGuy",                 "LuckyGuy":41,
      // LittleGirl, Cowboy, Batter, Thief
      42:"OperaSinger",              "OperaSinger":42,
      43:"TheShadow",                "TheShadow":43,
      44:"GoatMan",                  "GoatMan":44,
      45:"Hullabaloo",               "Hullabaloo":45,
          
      46:"Disciple",                 "Disciple":46,             
      47:"WaxArtis",                 "WaxArtis":47,             
      48:"Geisha",                   "Geisha":48,             
      49:"SoulWeaver",               "SoulWeaver":49, 
      50:"GameKeeper",               "GameKeeper":50,   
      
      51:"DreamWitch",               "DreamWitch":51,             
      52:"SmileyFace",               "SmileyFace":52,             
      53:"BreakingWheel",            "BreakingWheel":53,            
      54:"Hermit",                   "Hermit":54,             
      55:"AxeBoy",                   "AxeBoy":55,             
      56:"Naiad",                    "Naiad":56,            
      57:"Guard26",                  "Guard26":57,            
      58:"NightWatch",               "NightWatch":58,             
      59:"BloodyQueen",              "BloodyQueen":59,            
      60:"Clerk",                    "Clerk":60,            
      61:"Sculptor",                 "Sculptor":61,             
      62:"FoolsGold",                "FoolsGold":62,            
      63:"Reptilian",                "Reptilian":63,
    }
    return C[id]
  };

  //Map related data
  MapName(value) {
    switch (value){
      case "0":
        return "Arms Factory";
      case "1":
        return "Chinatown";
      case "2":
        return "Red Church";
      case "3":
        return "Eversleeping";
      case "4":
        return "Sacred";
      case "5":
        return "Lakeside";
      case "6":
        return "Leos Memory";
      case "7":
        return "Moonlit"; 
      default: 
        return ""        
    }
  }
  getMapName(){
    return this.MapName(this.Map)
  }

  //Hide some Hunters in the book if they're right clicked
  addIgnoredHunter(hunterIdNumber){
    this.ignoredHunters[hunterIdNumber] = "ignored"
    return 1
  }
  removeIgnoredHunter(hunterIdNumber){
    this.ignoredHunters[hunterIdNumber] = null
    return 1
  }
  isHunterIgnored(hunterIdNumber){
    return this.ignoredHunters[hunterIdNumber] === "ignored"
  }
}
  export default GlobaBanPickList