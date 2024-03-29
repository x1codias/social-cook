import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Message = { message: string };

const App = (): JSX.Element => {
   const [data, setData] = useState<string | null>(null);
  const url: string = "http://localhost:3001";

  useEffect(() => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data: Message) => setData(data.message));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
       <p>{!data ? "Loading..." : data}</p>
      </div>
    </>
  )
}

export default App
