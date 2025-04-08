import { Routes, Route, Navigate } from "react-router-dom";
import Board from "~/pages/Boards/_id";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Routes>
        {/* redirect router */}
        <Route
          path="/"
          element={
            <Navigate to={"/boards/67ea6a00609bdbb7c46dfbda"} replace={true} />
          }
        />
        {/* board detail */}
        <Route path="/boards/:boardId" element={<Board />} />
        {/* authentication */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
