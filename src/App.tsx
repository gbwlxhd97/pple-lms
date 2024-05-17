import { useState } from 'react';
import { ReactLogoIcon, ViteLogoIcon } from './icons/logo';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <ViteLogoIcon width={36} height={32} className="logo vite" />
        </a>
        <a href="https://react.dev" target="_blank">
          <ReactLogoIcon width={36} height={32} className="logo react" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
