import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import "./index.css";

const App = () => {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
