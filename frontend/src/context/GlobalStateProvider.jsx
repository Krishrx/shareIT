import { createContext, useContext, useEffect, useState } from 'react';
import { getAllData } from '../shared/getAndInitialiseData';

export const GlobalContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalContext);
}

// eslint-disable-next-line react/prop-types
function GlobalStateProvider({ children }) {
  
  const [globalState, setGlobalState] = useState({
    totalData: [],
    _id: '',
    title: '',
    content: '',
    isPublic: '',
    onEdit:false,
  })

  useEffect(() => {
    getAllData()
      .then((data) => {
        setGlobalState((prevGlobalState) => ({
          ...prevGlobalState,
          totalData: data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },[])

  return (
    <GlobalContext.Provider value={{globalState,setGlobalState}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStateProvider