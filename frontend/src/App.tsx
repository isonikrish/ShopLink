import { Route, Routes } from "react-router-dom"
import Authentication from "./pages/Authentication"
import {Toaster} from 'react-hot-toast';
import Navbar from "./components/Navbar";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Authentication />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App