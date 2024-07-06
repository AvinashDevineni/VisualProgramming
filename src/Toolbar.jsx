import { useRef } from "react";
import AssignmentNode from "./AssignmentNode";
import StartNode from './StartNode';

import './Toolbar.css';

export default function Toolbar({addToNodes, doesStartExist}) {
    const startNodeRef = useRef();
    const assignmentNodeRef = useRef();

    return (
        <>
            <div id="toolBar">
                <div className="toolBarItem">
                    <p>Start</p>
                    <StartNode isAbsolutePos={false} isDraggable={false}
                     setRef={(ref) => startNodeRef.current = ref}
                     onDrag={mousePos => {
                        if (doesStartExist !== undefined && doesStartExist())
                            return;
                        addToNodes({type: 'start', initPos: mousePos});
                     }}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isAbsolutePos={false} isDraggable={false}
                     setRef={(ref) => assignmentNodeRef.current = ref}
                     onDrag={mousePos => addToNodes({type: 'assignment', initPos: mousePos})}/>
                </div>
            </div>
        </>
    )
}