// import axios from 'axios';
// import { useState,useEffect } from 'react';

import Header from "./Header";

function App() {
  const isDark = false;
  return (
    <div className={`font-poppins w-full min-h-screen max-h-full ${isDark?'bg-darkBackground text-darkText':'bg-background text-text'}`}>
      <Header/>
    </div>
  )
}

export default App






// const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/thoughts").then((res) => setData(res.data));
//   }, [])
//   //console.log(data);
//   const formattedData = data.map((d) => {
//     return (
//       <div key={d._id}>
//       <p>{d.title}</p>
//       <p>{d.content}</p>
//       <p>{d.isPublic?'true':'false'}</p>
//     </div>
//     )
//   })
//   console.log(formattedData);
//   return (
//     <>
//       <h1 className="bg-purple-600 ds">Hello</h1>
//       {formattedData}
//     </>
//   )