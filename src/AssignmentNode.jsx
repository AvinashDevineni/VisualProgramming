import { useEffect, useRef, useState } from "react";

import './AssignmentNode.css';

export default function AssignmentNode({isDraggable, isAbsolutePos, initialPos, isDraggingInitially, onMove, onDrag, setRef, isInvisible}) {
    const [position, setPosition] = useState(initialPos === undefined ? {x: 0, y: 0} : initialPos);
    const mouseOffset = useRef({x: 0, y: 0});
    const nodeRef = useRef();
    const isFirstDrag = useRef(true);

    const [varName, setVarName] = useState('');
    const [assignmentVal, setAssignmentVal] = useState('');

    useEffect(() => {
        if (isDraggingInitially && isDraggable !== false) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        }
    }, []);

    function calculateMouseOffset(event, boundingBox) {
        mouseOffset.current = {x: event.pageX - boundingBox.left, y: event.pageY - boundingBox.top};
    }

    function handleMouseUp(event) {
        nodeRef.current.removeAttribute('data-hover');
        mouseOffset.current = {x: 0, y: 0};

        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }

    function handleMouseMove(event) {
        if (isDraggingInitially && isFirstDrag.current) {
            nodeRef.current.setAttribute('data-hover', 'hover');
            const boundingBox = nodeRef.current.getBoundingClientRect();
            calculateMouseOffset(event, boundingBox);
            isFirstDrag.current = false;
        }
        
        setPosition({x: event.pageX - mouseOffset.current.x, y: event.pageY - mouseOffset.current.y});

        if (onMove)
            onMove({x: event.pageX - mouseOffset.current.x, y: event.pageY - mouseOffset.current.y});
    }

    function handleDrag(event) {
        const boundingBox = nodeRef.current.getBoundingClientRect();
        calculateMouseOffset(event, boundingBox);

        if (onDrag)
            onDrag({x: event.pageX - mouseOffset.current.x, y: event.pageY - mouseOffset.current.y});

        if (isDraggable === false)
            return;

        nodeRef.current.setAttribute('data-hover', 'hover');

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
    }

    const divStyles = {
        position: (isAbsolutePos === false) ? 'relative' : 'absolute',
        top: `${position.y}px`, left: `${position.x}px`
    };

    if (isInvisible)
        divStyles.display = 'none';

    return (
        <>
            <div ref={(divRef) => {
                nodeRef.current = divRef;
                if (setRef)
                    setRef(divRef);
             }}
             className={"node assignmentNode"} onMouseDown={handleDrag} style={divStyles}>
                <input type="text" className="assignmentVarName"/>
                <p className="assignmentEquals" draggable={false}>=</p>
                <input type="text" className="assignmentVal"/>
            </div>
        </>
    )
}