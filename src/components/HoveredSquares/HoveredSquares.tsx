import classes from './hoveredSquares.module.css';

interface HoveredSquaresProps {
  hoveredSquares: number[];
  fieldSize: number;
}

export const HoveredSquares = ({
  hoveredSquares,
  fieldSize
}: HoveredSquaresProps) => {
  return (
    <div className={classes.container}>
      <h3>Hover Squares</h3>
      <div className={classes.cellsContainer}>
        {hoveredSquares.map(elem => (
          <div key={elem} className={classes.infoCell}>
            row {Math.floor(elem / fieldSize) + 1} col {(elem % fieldSize) + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
