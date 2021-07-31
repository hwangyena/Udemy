import React from "react";

function App() {
  const [count, updateCount] = React.useState(0);

  function decrease(){
    updateCount(count-1);
  }
  function increase(){
    updateCount(count+1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
    </div>
  );
}

export default App;
