import { createContext, useContext, useState } from 'react';
import { getName } from '../shared/getAndInitialiseData';

export const GlobalContext = createContext();

export const useGlobalState = () => {
  return useContext(GlobalContext);
}

// eslint-disable-next-line react/prop-types
function GlobalStateProvider({ children }) {
  
  const [globalState, setGlobalState] = useState({
    totalData: '',
    totalDataCount: 0,
    _id: '',
    title: '',
    content: '',
    isPublic: '',
    onEdit:false,
  })

  return (
    <GlobalContext.Provider value={globalState}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStateProvider