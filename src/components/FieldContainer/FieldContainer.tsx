import { useState } from 'react';

import { Field } from '../Field';
import classes from './fieldContainer.module.css';

interface FieldProps {
  fieldData: [string, { field: number }][];
  changeFieldSizeHandler: (val: number) => void;
  fieldSize: number;
  hoveredSquares: number[];
  fieldCellHoverHandler: (index: number) => void;
}

export const FieldContainer = ({
  fieldData,
  changeFieldSizeHandler,
  fieldSize,
  hoveredSquares,
  fieldCellHoverHandler
}: FieldProps) => {
  const [selectedSize, setSelectedSize] = useState(fieldSize);

  return (
    <div className={classes.container}>
      <div className={classes.topArea}>
        <select
          className={classes.select}
          value={selectedSize}
          onChange={event => setSelectedSize(Number(event.target.value))}
        >
          <option value={0}>Pick mode</option>
          {fieldData.map(elem => (
            <option value={elem[1].field} key={elem[0]}>
              {elem[0].charAt(0).toUpperCase() + elem[0].slice(1)}
            </option>
          ))}
        </select>
        <button
          className={classes.startBtn}
          onClick={() => changeFieldSizeHandler(selectedSize)}
        >
          Start
        </button>
      </div>
      <Field
        size={fieldSize}
        hoveredSquares={hoveredSquares}
        onCellHover={fieldCellHoverHandler}
      />
    </div>
  );
};
