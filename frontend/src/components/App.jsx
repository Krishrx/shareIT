import axios from 'axios';
import { useState,useEffect } from 'react';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/blogs").then((res) => setData(res.data));
  }, [])
  
  return (
    <>
      <h1 className="bg-purple-600 ds">Hello</h1>
      <h2>{data}</h2>
    </>
  )
}

export default App
