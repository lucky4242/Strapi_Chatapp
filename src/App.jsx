import Login from "./pages/login";
import Nav from "./Components/Nav";
import Chat from "./pages/Chat";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/Chat" element={<Chat />} /> */}
        <Route
          path="/Chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
