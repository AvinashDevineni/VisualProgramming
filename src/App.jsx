import Toolbar from './Toolbar';
import Arrow from './Arrow';

import './App.css'

export default function App() {
  return (
    <>
      <Toolbar/>
      <Arrow from={{x: 100, y: 100}} to={{x: 300, y: 167}}/>
    </>
  )
}