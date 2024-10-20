import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BarcodeScannerComponent from './components/BarcodeScanner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <BarcodeScannerComponent />

  </StrictMode>,
)
