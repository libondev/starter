import { useState } from "react";

function Header() {
  console.log("Header", Math.random());
  return (
    <header>
      <h1>React Counter</h1>
    </header>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </>
  );
}

export default App
