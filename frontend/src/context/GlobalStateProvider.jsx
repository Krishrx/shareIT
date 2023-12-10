import { createContext, useContext, useEffect, useState } from 'react';
import { getAllData } from '../shared/getAndInitialiseData';
import { useAuthContext } from '../hooks/useAuthContext';

export const GlobalContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalContext);
}

// eslint-disable-next-line react/prop-types
function GlobalStateProvider({ children }) {
  const { user } = useAuthContext();

  const [globalState, setGlobalState] = useState({
    totalData: [],
    _id: '',
    title: '',
    content: '',
    isPublic: '',
    onEdit:false,
  })

  useEffect(() => {
    if (user) {
      getAllData(user)
      .then((data) => {
        setGlobalState((prevGlobalState) => ({
          ...prevGlobalState,
          totalData: data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },[user])

  return (
    <GlobalContext.Provider value={{globalState,setGlobalState}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStateProvider