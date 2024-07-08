import { useRef, useState } from 'react';

import Toolbar from './Toolbar';
import StartNode from './StartNode';
import AssignmentNode from './AssignmentNode';
import FunctionNode from './FunctionNode';

import './App.css'

export default function App() {
  const [nodeTypes, setNodeTypes] = useState([]);
  const [nodeInitialPositions, setNodeInitialPositions] = useState([]);
  const cachedNodes = useRef([]);

  const toolbarBoundingBox = useRef();

  const functions = [
    {name: 'PRINT', numParams: 1}, {name: 'SIN', numParams: 1},
    {name: 'COS', numParams: 1}, {name: 'TAN', numParams: 1},
    {name: 'EULER', numParams: 0}, {name: 'PI', numParams: 0}
  ]

  function addToNode(node) {
    setNodeTypes(nodeTypes => nodeTypes.concat(node.type));
    setNodeInitialPositions(nodeInitialPositions => nodeInitialPositions.concat(node.initPos));
  }

  function handleOnDrop(position, idx) {
    if (position.y < toolbarBoundingBox.current.bottom) {
      setNodeTypes(nodeTypes.filter((nodeType, i) => i !== idx));
      setNodeInitialPositions(nodeInitialPositions.filter((initPos, i) => i !== idx));
    }
  }

  return (
    <>
      <Toolbar setRef={ref => { if (!toolbarBoundingBox.current) toolbarBoundingBox.current = ref.getBoundingClientRect() }}
       addToNodes={addToNode} doesStartExist={() => nodeTypes.includes('start')} functionOptions={functions}/>

      {nodeTypes.map((nodeType, i) => {
        if (i < cachedNodes.current.length)
          return cachedNodes.current[i];

        if (nodeType === 'start') {
          cachedNodes.current.push((
            <>
              <StartNode key={i} isDraggingInitially={true} initialPos={nodeInitialPositions[i]}
                onDrop={mouse => handleOnDrop(mouse, i)}/>
            </>
          ));
        }

        else if (nodeType === 'assignment') {
          cachedNodes.current.push((
            <>
              <AssignmentNode key={i} isDraggingInitially={true} initialPos={nodeInitialPositions[i]}
                onDrop={mouse => handleOnDrop(mouse, i)}/>
            </>
          ));
        }

        else if (nodeType === 'function') {
          cachedNodes.current.push((
            <>
              <FunctionNode key={i} isDraggingInitially={true} initialPos={nodeInitialPositions[i]}
               functionOptions={functions} onDrop={mouse => handleOnDrop(mouse, i)}/>
            </>
          ))
        }

        return cachedNodes.current[i];
      })}
    </>
  )
}