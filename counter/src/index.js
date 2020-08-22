import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import CounterButton from './CounterButton';
import Display from './Display';

function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (value) => setCounter(counter + value);
  return (
    <React.StrictMode>
      <CounterButton onCountIncremented={incrementCounter} incrementBy={1} />
      <CounterButton onCountIncremented={incrementCounter} incrementBy={5} />
      <CounterButton onCountIncremented={incrementCounter} incrementBy={10} />
      <CounterButton onCountIncremented={incrementCounter} incrementBy={100} />
      <Display currentCount={counter} />
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);