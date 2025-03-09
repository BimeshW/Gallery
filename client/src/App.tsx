import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
