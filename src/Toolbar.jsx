import AssignmentNode from "./AssignmentNode";
import StartNode from './StartNode';

import './Toolbar.css';

export default function Toolbar() {
    return (
        <>
            <div id="toolBar">
                <div className="toolBarItem">
                    <p>Start</p>
                    <StartNode isDraggable={false}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isDraggable={false}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isDraggable={false}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isDraggable={false}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isDraggable={false}/>
                </div>
                <div className="toolBarItem">
                    <p>Assignment</p>
                    <AssignmentNode isDraggable={false}/>
                </div>
            </div>
        </>
    )
}