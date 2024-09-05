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
    this.progressBars = []
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
  restoreRoundData(arr){
    if (!arr) return 0
    this.Map = arr[0][0];
    this.cipherLayout = arr[0][2]
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
    this.Positions = arr[6];
    this.tempPositions = structuredClone(arr[6]);
    this.progressBars.splice(0,this.progressBars.length) 
    this.progressBars.push(...arr[7])
  }
  compileRoundData(){
    // eslint-disable-next-line
    const exportArray = [
      [this.Map,this.MapName(this.Map),this.cipherLayout],
      this.value,
      this.Round,
      [this.AB1,this.AB2,this.AS1,this.AS2],
      [this.hunterSelect,this.hunterSlot0,this.hunterSlot1,this.hunterSlot2,this.hunterSlot3,this.hunterSlot4],
      [this.hunterBan1, this.hunterBan2, this.hunterBan3],
      this.tempPositions,
      structuredClone(this.progressBars),
    ]; 
    console.log("exported array element n7 is = ")
    console.log(exportArray)
    console.log(this.progressBars)
    return exportArray // change the export 
  }
  
  layerID(url){
    if (!url) return -1
    const split = url.split("_");
    const layerId = split.length === 4 ? split[2] : -1;
    return layerId;
  }
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
    this.progressBars.splice(0,this.progressBars.length) 
    return 1;
  }
  NextRound (){// (0) 
    // Save the state of this round in a variable called X="Round"+this.round+"Data"
    if (this.Round === 6) return // No ROund after 6th round (OverTime)
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName]=this.compileRoundData()
    const nextRoundName = `Round${this.Round+1}Data`
    const nextRoundData = this[nextRoundName]

    if (nextRoundData!==undefined){
      const overWrite = window.confirm("Overwrite Next Round data ? Cancel will load Next Round Data directly");
      if (!overWrite){ 
        this.restoreRoundData(nextRoundData);
        return 1
      }
    }
    this.Round++;
    const oldRemoved = this.getSimpleRemoved();
    const permBan1 = this.value[11];// First  Selected Charecter
    const permBan2 = this.value[12];// Second Selected Charecter
    const permBan3 = this.value[14];// Third  Selected Charecter
    this.Clear();
    for (let i=0;i < oldRemoved.length;i++){
      this.value[i] = oldRemoved[i]
    }
    permBan1!=="11" && this.addRemoved(permBan1);
    permBan2!=="12" && this.addRemoved(permBan2); 
    permBan3!=="14" && this.addRemoved(permBan3); 
    return 1 
      
    
  }
  PreviousRound(){
    // this.Round
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName] = this.compileRoundData()
    const roundName = `Round${this.Round-1}Data`
    this.restoreRoundData(this[roundName])
  }
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
    //Insert logic to check if value exists already to skip this step
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
      console.log("Charcter was not Selected");
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
      console.log("Charcter was not Banned");
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
    console.log("Charcter was not Removed")
    this.value = array
    return 0
  }
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
  getMapCharcters(){
    const result = []
    if (this.value[11]!=="11")   result.push( this.getEquiv(this.value[11]) );
    if (this.value[12]!=="12")   result.push( this.getEquiv(this.value[12]) );
    if (this.value[14]!=="14")   result.push( this.getEquiv(this.value[14]) );
    if (this.value[16]!=="16")   result.push( this.getEquiv(this.value[16]) );           
    if (this.hunterSelect!=="") result.push(this.getEquiv(this.hunterSelect));
    console.log("reulst", result, this.value)
    return result
  }  
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
    // console.log("the set values (HunterIDs to ignore) are =>",res)
    return res
  }
  getSelected (){
    return [this.value[11],this.value[12],this.value[14],this.value[16]]
  }
  getSelectedIDs (){
    return [this.getEquiv(this.value[11]),this.getEquiv(this.value[12]),this.getEquiv(this.value[14]),this.getEquiv(this.value[16])]
  }
  getBanned ()  {
    return  [this.value[9],this.value[10],this.value[13],this.value[15]]
  }
  getSimpleRemoved (){
    const arr = this.value;
    const result = [];
    for (let i=0;i<9;i++){
      if (arr[i]===String(i)) return result;
      result.push(arr[i]);
    }
    return  result
  }
  getRemoved (){
    // return  [...getSimpleRemoved,...this.getMoreRemoved()]

    return  [this.value[0],this.value[1],this.value[2],this.value[3],this.value[4],this.value[5],this.value[6],this.value[7],this.value[9],...this.getMoreRemoved()]
  }
  getBannedRemoved(){
    // return  [...getBanned,...getSimpleRemoved,...this.getMoreRemoved()]
    return  [this.value[9],this.value[10],this.value[13],this.value[15],  this.value[0],this.value[1],this.value[2],this.value[3],this.value[4],this.value[5],this.value[6],this.value[7],this.value[9],...this.getMoreRemoved()]
  }
  getMoreRemoved(){
    if (this.value.length<=14) return []
    const arr = []
    for (let k = 17; k < this.value.length; k++){
      arr.push(this.value[k])
    }
    return arr 
  }
  // getAllStates(){
  //   return [...this.getSelected,...this.getBanned,...this.getRemoved]
  // }

  findId(id,array){
    for (let i = 0; i < array.length; i++){
      if (array[i]===id) return true
    }
    return false
  }
  isSelected(id){
    const array = this.getSelected()
    return this.findId(id,array)
  }
  isBanned(id){
    const array = this.getBanned()
    return this.findId(id,array)
  }
  isRemoved(id){
    const array = this.getRemoved()
    return this.findId(id,array)
  }
  idExist(id){
    const array = this.value
    return this.findId(id,array)
  }
  isSurvsSelectionomplete (){
    if (this.value[11]==="11")   return false
    if (this.value[12]==="12")   return false
    if (this.value[14]==="14")   return false
    if (this.value[16]==="16")   return false
    return true
  }
  is1SurvsSelecteded (){
    if (this.value[11]!=="11")   return true
    if (this.value[12]!=="12")   return true
    if (this.value[14]!=="14")   return true
    if (this.value[16]!=="16")   return true
    return false
  }

  getName(filename) {
    const split1 = filename.split("_");
    if (split1.length < 1) return "";
    const split2 = split1[1].split(".");
    return split2[0];
  }
  getEquiv (id) { 
    const C = {
      0:"Puppeteer",
      1:"Gardener",      
      2:"Perfumer",
      3:"Doctor",
      4:"LuckyGuy",
      5:"Magician",
      6:"Mercenary",
      7:"FirstOfficer",
      8:"Wildling",
      9:"Coordinator",
      10:"Gravekeeper",
      11:"Forward",
      12:"Seer",
      13:"Acrobat",
      14:"Aeroplanist",
      15:"Patient",
      16:"Psychologist",
      17:"Barmaid",
      18:"Antiquarian",
      19:"Prospector",
      20:"Cheerleader",
      21:"Cowboy",
      22:"Thief",
      23:"Batter",
      24:"Entomologist",
      25:"Priestess",
      26:"Dancer",
      27:"ToyMerchant",
      28:"Embalmer",
      29:"Professor",
      30:"Lawyer",
      31:"Explorer",
      32:"Composer",
      33:"Mechanic",
      34:"TME",
      35:"Postman",
      36:"Novelist",
      37:"WeepingClown",
      38:"Journalist",
      39:"Painter",
      40:"Enchantress",
      41:"Prisoner",

      "Puppeteer":0,
      "Gardener":1,      
      "Perfumer":2,
      "Doctor":3,
      "LuckyGuy":4,
      "Magician":5,
      "Mercenary":6,
      "FirstOfficer":7,
      "Wildling":8,
      "Coordinator":9,
      "Gravekeeper":10,
      "Forward":11,
      "Seer":12,
      "Acrobat":13,
      "Aeroplanist":14,
      "Patient":15,
      "Psychologist":16,
      "Barmaid":17,
      "Antiquarian":18,
      "Prospector":19,
      "Cheerleader":20,
      "Cowboy":21,
      "Thief":22,
      "Batter":23,
      "Entomologist":24,
      "Priestess":25,
      "Dancer":26,
      "ToyMerchant":27,
      "Embalmer":28,
      "Professor":29,
      "Lawyer":30,
      "Explorer":31,
      "Composer":32,
      "Mechanic":33,
      "TME":34,
      "Postman":35,
      "Novelist":36,
      "WeepingClown":37,
      "Journalist":38,
      "Painter":39,
      "Enchantress":40,
      "Prisoner":41,

      

      42:"OperaSinger",
      43:"TheShadow",
      44:"Disciple",
      45:"GameKeeper",

      46:"DreamWitch",
      47:"WaxArtis",
      48:"SoulWeaver",

      49:"SmileyFace",
      50:"BreakingWheel",
      51:"Hermit",
      52:"AxeBoy",

      53:"Naiad",
      54:"Guard26",
      55:"NightWatch",
      56:"BloodyQueen",
      57:"Geisha",

      58:"Clerk",
      59:"Sculptor",
      60:"FoolsGold",
      61:"Reptilian",
       
      "OperaSinger":42,
      "TheShadow":43,
      "Disciple":44,
      "GameKeeper":45,
       
      "DreamWitch":46,
      "WaxArtis":47,
      "SoulWeaver":48,
       
      "SmileyFace":49,
      "BreakingWheel":50,
      "Hermit":51,
      "AxeBoy":52,
       
      "Naiad":53,
      "Guard26":54,
      "NightWatch":55,
      "BloodyQueen":56,
      "Geisha":57,
      
      "Clerk":58,
      "Sculptor":59,
      "FoolsGold":60,
      "Reptilian":61,
         
    }//Novelist
    // console.log("id :",id," is",C[id])
    // for (const key in C){
    //   console.log("key :",key, "=?",id," => ",key===id)
    // }
    // console.log(C)
    return C[id]
  };

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

  importList(JSONtext){
    if (JSONtext.length<30) return 0
    const JSONtext1 = JSONtext.replace("||", '').replace("||", '')
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
  // IDK if i need these functions
  exportList(){
    // save current round
    const currentRoundName = `Round${this.Round}Data`
    this[currentRoundName] = this.compileRoundData();
    // start adding rounds to the exported array
    const exportArrays = []
    for (let i = 1 ; i <= 6 ; i++){
      const roundName = `Round${i}Data`;
      exportArrays.push(this[roundName]);
    }

    navigator.clipboard.writeText("||"+JSON.stringify(exportArrays)+"||");
    console.log("Exported Globalist is =>",exportArrays)
    return exportArrays // change the export 
  }
  importOneRound(JSONtext){
    if (JSONtext.length<30) return 0
    let arr = JSON.parse(JSONtext)
    console.log("Imported Globalist is =>",arr)
    this.Map = arr[0][0];
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
    this.Positions = arr[6];
    this.tempPositions = structuredClone(arr[6]);
  }
  exportCurrentRound(){
    // eslint-disable-next-line
    const exportArray = [
      [this.Map,this.MapName(this.Map)],
      this.value,
      this.Round,
      [this.AB1,this.AB2,this.AS1,this.AS2],
      [this.hunterSelect,this.hunterSlot0,this.hunterSlot1,this.hunterSlot2,this.hunterSlot3,this.hunterSlot4],
      [this.hunterBan1, this.hunterBan2, this.hunterBan3],
      this.tempPositions
    ]; 
    navigator.clipboard.writeText(JSON.stringify(exportArray));
    console.log("Exported Globalist is =>",exportArray)
    return exportArray // change the export 
  }
  addIgnoredHunter(hunterIdNumber){
    this.ignoredHunters[hunterIdNumber] = "ignored"
    return 1
  }
  removeIgnoredHunter(hunterIdNumber){
    this.ignoredHunters[hunterIdNumber] = null
    return 1
  }
  isHunterIgnored(hunterIdNumber){
    // this.ignoredHunters[hunterIdNumber] === "ignored" && console.log("Condition for hunter ID:",hunterIdNumber ," is :",this.ignoredHunters[hunterIdNumber] === "ignored")
    return this.ignoredHunters[hunterIdNumber] === "ignored"
  }
}
  export default GlobaBanPickList