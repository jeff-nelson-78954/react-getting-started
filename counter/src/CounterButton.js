import React from 'react';
import './CounterButton.css';

function CounterButton(props) {
  const handleClick = () => props.onCountIncremented(props.incrementBy);
  return (
    <button onClick={handleClick}>+{props.incrementBy}</button>
  );
}

export default CounterButton;
