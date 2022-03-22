import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";
import "@/index.css";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
