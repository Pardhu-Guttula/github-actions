import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProfileLayout,
  ProfileContent,
  SettingsContent,
} from "./Components/HomePage";

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
