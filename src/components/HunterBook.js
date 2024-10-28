import React from "react";
import "../App.css";
import Row from "./Row";
import RowP from "./RowP";
import { useDrop } from "react-dnd";

function HunterBook(props) {
  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: () => {
      return props;
    },
    collect: (monitor) => ({
      isOverR: !!monitor.isOver(),
    }),
  })); 

  const Filter_Function_S = (HunterPointsLine)=>{
    const PointsArr = HunterPointsLine.Points
    if (count(PointsArr,-100) >= 3 ){
      return true
    }else{
      return false
    }
  }
  const Filter_Function_A = (HunterPointsLine)=>{
    const PointsArr = HunterPointsLine.Points
    if (count(PointsArr,-100) === 2 ){
      return true
    }else{
      return false
    }
  }
  const Filter_Function_B = (HunterPointsLine)=>{
    const PointsArr = HunterPointsLine.Points
    if (count(PointsArr,-100) === 1 && count(PointsArr,0) >= 1) {
      return true
    }else{
      return false
    }
  }
  const Filter_Function_C = (HunterPointsLine)=>{
    const PointsArr = HunterPointsLine.Points
    if (count(PointsArr,-100) === 1 && (count(PointsArr,50) >= 1 ) ){
      return !Filter_Function_B(HunterPointsLine)  // make sure you only return the hunter that didnt pass the B tier list
    }else{
      return false
    }
  }
  
  return (
    <div className="hunterbook" ref={drop} style={props.bookStyle}>
      <div className="s_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_s" />
      </div>
      <div className="a_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_a" />
      </div>
      <div className="b_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_b" />
      </div>
      <div className="c_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_c" />
      </div>
      <div className="d_tier">
        <Row globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="hunter_d" />
      </div>
      <div className="bucket_S">
        <RowP Criteria = {Filter_Function_S} globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="S" />
      </div>
      <div className="bucket_A">
        <RowP Criteria = {Filter_Function_A} globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="A" />
      </div>
      <div className="bucket_B">
        <RowP Criteria = {Filter_Function_B} globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="B" />
      </div>
      <div className="bucket_C">
        <RowP Criteria = {Filter_Function_C} globalList={props.globalList} pictures={props.PictureList}  update={props.update}  needUpdate={props.needUpdate} type="C" />
      </div>
    </div>
  );
}

function count(Array,val){
  const elementCounts = {};
  Array.forEach(element => {
  elementCounts[element] = (elementCounts[element] || 0) + 1;
  });
  // if (!elementCounts[val]) console.log("Value specified : ",val ,"is not existant")
  return elementCounts[val] || 0
}

export default HunterBook;