import React from "react";
import "../App.css";
import Row from "./Row";
import { useDrop } from "react-dnd";

function SurvivorBook(props) {
  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (_item) => {
      return props;
    },
    collect: (monitor) => ({
      isOverR: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="survivorbook" ref={drop} style={props.bookStyle}>
      
      <div className="rescuers">
        <Row 
          pictures={props.PictureList}
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}
          type="r" 
        />
      </div>
      <div className="others">
        <Row 
          pictures={props.PictureList}
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}
          type="o"
        />
      </div>
      <div className="kiters">
        <Row 
          pictures={props.PictureList} 
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}  
          type="k" 
        />
      </div>
      <div className="harassers">
        <Row 
          pictures={props.PictureList} 
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}  
          type="h" 
        />
      </div>
      <div className="supports">
        <Row 
          pictures={props.PictureList} 
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}  
          type="s" 
        />
      </div>
      <div className="decoders">
        <Row 
          pictures={props.PictureList} 
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}  
          type="d" 
        />
      </div>
      <div className="useless">
        <Row 
          pictures={props.PictureList} 
          draggables={props.draggables}
          globalList={props.globalList}
          needUpdate={props.needUpdate}
          update={props.update}  
          type="u" 
        />
      </div>

    </div>
  );
}

export default SurvivorBook;