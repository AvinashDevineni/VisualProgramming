import { useEffect, useRef } from "react";
import AssignmentNode from "./AssignmentNode";
import StartNode from './StartNode';

import './Toolbar.css';

export default function Toolbar() {
    const startNodeRef = useRef();
    const assignmentNodeRef = useRef();

    return (
        <>
            <div id="toolBar">
                <div className="toolBarItem">
                    <p>Start</p>
                    <StartNode isAbsolutePos={false} isDraggable={false}
                     setRef={(ref) => startNodeRef.current = ref}
                     onDrag={() => {
                        const nodeCopy = startNodeRef.current.cloneNode(true);
                        document.body.appendChild(nodeCopy);
                     }}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isAbsolutePos={false} isDraggable={false}
                     setRef={(ref) => assignmentNodeRef.current = ref}
                     onDrag={() => {
                        const nodeCopy = assignmentNodeRef.current.cloneNode(true);
                        document.body.appendChild(nodeCopy);
                     }}/>
                </div>
            </div>
        </>
    )
}