import LoginForm from "./Components/loginPage";
import HomePage from "./Components/homePage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
