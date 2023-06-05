import './Cell.css';

type CellProps = {
  x: number;
  y: number;
  value: number;
}

function Cell({ x, y, value }: CellProps) {
  return (
    <div className="cell">{value ? value : ""}</div>
  )
}

export default Cell;