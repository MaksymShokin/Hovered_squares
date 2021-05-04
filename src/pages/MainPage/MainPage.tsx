import { useCallback, useEffect, useState } from 'react';

import { FieldContainer } from '../../components/FieldContainer';
import { HoveredSquares } from '../../components/HoveredSquares';
import classes from './mainPage.module.css';

export type FieldDataInfo = Record<
  'easyMode' | 'normalMode' | 'hardMode',
  { field: number }
>;

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fieldData, setFieldData] = useState<FieldDataInfo>();
  const [fieldSize, setFieldSize] = useState(0);
  const [hoveredSquares, setHoveredSquares] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const response = await fetch('http://demo1030918.mockable.io/');

      if (response.status !== 200) {
        setHasError(true);
        throw new Error(`Failed to fetch data`);
      }

      const parsedResponse = await response.json();

      setFieldData(parsedResponse);
      setIsLoading(false);
    })();
  }, []);

  const changeFieldSizeHandler = useCallback((val: number) => {
    setFieldSize(val);
    setHoveredSquares([]);
  }, []);

  const fieldCellHoverHandler = useCallback(
    (index: number) => {
      const arrayIndex = hoveredSquares.findIndex(elem => elem === index);
      const arrayCopy = [...hoveredSquares];

      arrayIndex >= 0 ? arrayCopy.splice(arrayIndex, 1) : arrayCopy.push(index);

      setHoveredSquares(arrayCopy);
    },
    [hoveredSquares]
  );

  if (isLoading || !fieldData) {
    return (
      <div className={classes.container}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={classes.container}>
        <h1>Failed to fetch error</h1>;
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <FieldContainer
        fieldData={Object.entries(fieldData)}
        changeFieldSizeHandler={changeFieldSizeHandler}
        fieldSize={fieldSize}
        hoveredSquares={hoveredSquares}
        fieldCellHoverHandler={fieldCellHoverHandler}
      />
      <HoveredSquares hoveredSquares={hoveredSquares} fieldSize={fieldSize} />
    </div>
  );
};
