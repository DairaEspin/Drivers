import "./App.css";
import Detail from "./components/Detail/Detail";
import { Homepage } from "./components/Home/Homepage";
import { Route, Routes } from "react-router-dom";
import{ About } from "./views/About/aboutView";
import LandingPage from "./views/Landing/landing";
import Create from "./views/create";

function App() {

  return (
    <>
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
  )
}
export default App;
