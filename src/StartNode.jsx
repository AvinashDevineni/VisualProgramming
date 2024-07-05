import { useRef, useState } from "react";

import './StartNode.css';

export default function StartNode({isDraggable, isAbsolutePos, onMove, onDrag, setRef, isInvisible}) {
    const [position, setPosition] = useState({x: 0, y: 0});
    const mouseOffset = useRef({x: 0, y: 0});
    const nodeRef = useRef();

    function handleMouseUp(event) {
        mouseOffset.current = {x: 0, y: 0};

        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }

    function handleMouseMove(event) {
        setPosition({x: event.pageX - mouseOffset.current.x, y: event.pageY - mouseOffset.current.y});

        if (onMove)
            onMove({x: event.pageX - mouseOffset.current.x, y: event.pageY - mouseOffset.current.y});
    }

    function handleDrag(event) {
        const boundingBox = nodeRef.current.getBoundingClientRect();
        mouseOffset.current = {x: event.pageX - boundingBox.left, y: event.pageY - boundingBox.top};

        if (onDrag)
            onDrag();

        if (isDraggable)
            return;

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
             id="startNode" className="node"
             onMouseDown={(isDraggable === false) ? () => { if (onDrag) onDrag() } : handleDrag}
             style={divStyles}>
                <p>START</p>
            </div>
        </>
    )
}