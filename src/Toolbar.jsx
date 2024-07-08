import { useRef } from "react";
import StartNode from './StartNode';
import AssignmentNode from "./AssignmentNode";
import FunctionNode from './FunctionNode';

import './Toolbar.css';

export default function Toolbar({setRef, addToNodes, doesStartExist, functionOptions}) {
    return (
        <>
            <div ref={setRef} id="toolBar">
                <div className="toolBarItem">
                    <p>Start</p>
                    <StartNode isAbsolutePos={false} isDraggable={false}
                     onDrag={mousePos => {
                        if (doesStartExist !== undefined && doesStartExist())
                            return;
                        addToNodes({type: 'start', initPos: mousePos});
                     }}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isAbsolutePos={false} isDraggable={false} isInputDisabled={true}
                     onDrag={mousePos => addToNodes({type: 'assignment', initPos: mousePos})}/>
                </div>
                <div className="toolBarItem">
                    <p>Function Call</p>
                    <FunctionNode isAbsolutePos={false} isDraggable={false}
                     isInputDisabled={true} functionOptions={functionOptions}
                     onDrag={mousePos => addToNodes({type: 'function', initPos: mousePos})}/>
                </div>
            </div>
        </>
    )
}