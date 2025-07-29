import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx';
import AtlasPage from './pages/AtlasPage.tsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/atlas" element={<AtlasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;