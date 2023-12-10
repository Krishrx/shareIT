import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import './styles/App.css'
import GlobalStateProvider from './context/GlobalStateProvider.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
