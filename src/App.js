import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage.jsx";
import ProfileLayout from "./Components/ProfilePage.jsx";
import ProfileContent from "./Components/ProfileContent.jsx";
import SettingsContent from "./Components/Settings.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileContent />} />
          <Route path="settings" element={<SettingsContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
