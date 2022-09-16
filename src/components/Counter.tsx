import React, {useState} from 'react';
import classes from './Counter.module.scss';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const onClick = () => setCount((prev) => prev + 1)

  return (
    <div className={classes.btn}>
      <h1>{count}</h1>
      <button onClick={onClick}>+1</button>
    </div>
  );
};
