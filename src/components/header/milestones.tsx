import React, {useEffect, useRef, useState} from "react";

import styles from "./milestones.module.css";
import {BarTask} from "../../types/bar-task";
import {TaskGanttContentProps} from "../gantt/task-gantt-content";
import {Tip} from "./tip";
 export const HeaderMileStone = (props: any) => {
   const {mls,onEventCallback } = props;
   const textRef = useRef<SVGTextElement>(null);
   const [showTextInline, setShowTextInline] = useState(true);
  const transform = `rotate(45 ${mls.x1 + mls.graphHeight * 0.356}
    ${mls.graphY + mls.graphHeight * 0.85})`;

  useEffect(() => {
    if (textRef.current) {
      setShowTextInline(textRef.current.getBBox().width < (mls.x2 - mls.x1));
    }
  }, [mls.x1,mls.x2,textRef]);

   const onEventStart = (action: any, task: any) => {
     if ((!showTextInline && (action === 'mouseenter' || action === 'mouseleave'))
       || action ==="click")   {
       onEventCallback &&  onEventCallback(action,task);
     }
   };

  return (<g className={styles.milestoneWrapper} key={mls.id}
             onMouseEnter={() => {
               onEventStart("mouseenter", mls);
             }}
             onMouseLeave={() => {
               onEventStart("mouseleave", mls);
             }}
             onClick={() => {
               onEventStart("click", mls);
             }}
   >
    <rect
      fill={mls.color}
      x={mls.x1}
      width={mls.graphHeight}
      y={mls.graphY}
      height={mls.graphHeight}
      transform={transform}
      className={styles.milestoneBackground}
    />
     (<text
      x={mls.x1 +mls.graphHeight + 8}
      y={mls.graphY+ mls.graphHeight/2 +4}
      className={styles.barLabelOutside}
      ref={textRef}
    >
      {showTextInline ? mls.name : ""}
    </text>)
  </g>)
}

export const Milestones: React.FC<TaskGanttContentProps> = ({tasks, fontFamily, svgWidth,
                                                              handleHeaderMlsClick,fontSize}) => {
  const [mlsData, setMlsData] = useState<BarTask[]>([]);
   const [showTips, setShowTips] =  useState(false);
  const [selectedMls, setSelectedMls] = useState<BarTask>();
  useEffect(() => {
    //graphY 是指header上的里程碑Y坐标点， 区别与其他的Y是因为要一行显示在header里面
    const heightLevelData = tasks.filter(i => i.level ==="L2").map(item => {
      return Object.assign(item, {
        graphY: tasks[0].y,
      })
    });
    setMlsData(heightLevelData);
  }, [tasks]);

   const onMlsEvent = (action: any, task: any) => {
     switch (action) {
       case 'mouseenter':
         setSelectedMls(task);
         setShowTips(true);
         break;
       case 'mouseleave':
         setSelectedMls(task);
         setShowTips(false);
         break;
       default:
         handleHeaderMlsClick &&  handleHeaderMlsClick(task);
     }
   }

  return (<div style={{position: 'relative'}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgWidth}
      height={30}
      fontFamily={fontFamily}
    >
    {mlsData.map(i => <HeaderMileStone mls={i} key={i.id} onEventCallback={onMlsEvent}/>)}
    </svg>
    {showTips && (<Tip task={selectedMls} fontSize={fontSize} fontFamily={fontFamily} />)}
  </div>)
};
