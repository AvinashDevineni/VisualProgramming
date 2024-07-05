import { useRef, useState } from 'react';

import Toolbar from './Toolbar';
import StartNode from './StartNode';
import AssignmentNode from './AssignmentNode';

import './App.css'

export default function App() {
  const [nodeTypes, setNodeTypes] = useState([]);
  const [nodeInitialPositions, setNodeInitialPositions] = useState([]);
  const cachedNodes = useRef([]);

  function addToNode(node) {
    setNodeTypes(nodeTypes => nodeTypes.concat(node.type));
    setNodeInitialPositions(nodeInitialPositions => nodeInitialPositions.concat(node.initPos));
  }

  return (
    <>
      <Toolbar addToNodes={addToNode} doesStartExist={() => nodeTypes.includes('start')}/>
      {nodeTypes.map((nodeType, i) => {
        if (i < cachedNodes.current.length)
          return cachedNodes.current[i];

        if (nodeType === 'start') {
          cachedNodes.current[i] = (
            <>
              <StartNode isDraggingInitially={true} initialPos={nodeInitialPositions[i]}/>
            </>
          );
        }

        else if (nodeType === 'assignment') {
          cachedNodes.current[i] = (
            <>
              <AssignmentNode isDraggingInitially={true} initialPos={nodeInitialPositions[i]}/>
            </>
          );
        }

        return cachedNodes.current[i];
      })}
    </>
  )
}