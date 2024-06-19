import { useRef, useState } from "react";

import './StartNode.css';

export default function StartNode({onMove}) {
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
            onMove();
    }

    function handleDrag(event) {
        const boundingBox = nodeRef.current.getBoundingClientRect();
        mouseOffset.current = {x: event.pageX - boundingBox.left, y: event.pageY - boundingBox.top};

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
    }

    return (
        <>
            <div ref={nodeRef} id="startNode" className="node" onMouseDown={handleDrag}
             style={{top: `${position.y}px`, left: `${position.x}px`}}>
                <p>START</p>
            </div>
        </>
    )
}