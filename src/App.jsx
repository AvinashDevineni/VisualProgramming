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

  function addToNode(node) {
    setNodeTypes(nodeTypes => nodeTypes.concat(node.type));
    setNodeInitialPositions(nodeInitialPositions => nodeInitialPositions.concat(node.initPos));
  }

  return (
    <>
      <Toolbar addToNodes={addToNode} doesStartExist={() => nodeTypes.includes('start')}/>

      {/*Later the API will be called to get all functions*/}
      <FunctionNode functionOptions={[{name: 'PRINT', numParams: 1}, {name: 'SIN', numParams: 1}, {name: 'COS', numParams: 1}, {name: 'TAN', numParams: 1}, {name: 'EULER', numParams: 0}, {name: 'PI', numParams: 0}]}/>

      {nodeTypes.map((nodeType, i) => {
        if (i < cachedNodes.current.length)
          return cachedNodes.current[i];

        if (nodeType === 'start') {
          cachedNodes.current.push((
            <>
              <StartNode key={i} isDraggingInitially={true} initialPos={nodeInitialPositions[i]}/>
            </>
          ));
        }

        else if (nodeType === 'assignment') {
          cachedNodes.current.push((
            <>
              <AssignmentNode key={i} isDraggingInitially={true} initialPos={nodeInitialPositions[i]}/>
            </>
          ));
        }

        return cachedNodes.current[i];
      })}
    </>
  )
}