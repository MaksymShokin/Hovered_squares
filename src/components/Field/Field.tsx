import cx from 'classnames';

import classes from './field.module.css';

interface FieldProps {
  size: number;
  hoveredSquares: number[];
  onCellHover: (index: number) => void;
}

export const Field = ({ size, onCellHover, hoveredSquares }: FieldProps) => {
  return (
    <div style={{ width: size * 40 }} className={classes.field}>
      {Array.from({ length: size * size }, (_, i) => i).map(e => (
        <div
          className={cx(classes.fieldCell, {
            [classes.hovered]: hoveredSquares.includes(e)
          })}
          key={e}
          onMouseEnter={() => onCellHover(e)}
        />
      ))}
    </div>
  );
};
