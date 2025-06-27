import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './components/CarritoContext.jsx';
import ReactDOM from "react-dom/client";
ReactDOM.createRoot(document.getElementById('root')).render(
  <CarritoProvider>
    <App />
  </CarritoProvider>
);

