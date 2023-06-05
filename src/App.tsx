import { useState } from 'react';
import Cell from './Cell.tsx';
import './App.css';

function buildInitialGrid (rows: number = 50, columns: number = 50): number[][] {
  return new Array(rows).fill(new Array(columns).fill(0));
}

function App() {
  const [grid, setGrid] = useState(() => buildInitialGrid());
  
  return (
    <>
      {grid.map((row, x) =>
        <div key={`${x}-row`} className="row">
          {row.map((value, y) =>
            <Cell key={`${y}-column`} x={x} y={y} value={value} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
