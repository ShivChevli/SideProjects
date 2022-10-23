import './App.css';
import Button from './Components/Button';
import { useState } from 'react';

function App() {
  // const [first, setfirst] = useState(second)
  let [count, setCount] = useState(0);

  let onClickUpdateCount = () => {
    setCount((old) => {
      return old + 1;
    })
  }
  return (
    <div className="App">
      <p>{count}</p>
      <Button setOnClick={onClickUpdateCount} isOutline={true} color="red">Name</Button>
    </div>
  );
}

export default App;
