import React, {useEffect, useState} from "react";
import styles from "../other/tooltip.module.css";
export const Tip = (props: any) => {
  const {task, fontSize, fontFamily}  = props;
  const [relatedX, setRelateX] = useState(0);
  const [relatedY, setRelateY] = useState(0);

  useEffect(() => {
    if (task) {
    setRelateX(task.x1 + task.graphHeight + 10);
    setRelateY(task.graphY);
    }
  },[task])


  return (
    <div
      className={
        relatedX
          ? styles.tooltipDetailsContainer
          : styles.tooltipDetailsContainerHidden
      }
      style={{ left: relatedX, top: relatedY, fontFamily: fontFamily}}
    >
      <div className={styles.tooltipDefaultContainer}>
        <div><span style={{fontSize: fontSize, color: "black"}}>{task?.name}</span></div>
       <div><span className={styles.tooltipDefaultContainerParagraph}>{`${task?.start?.getFullYear()}-${
          task?.start?.getMonth() + 1
        }-${task?.start?.getDate()}`}</span></div>
      </div>
    </div>
  );



}
