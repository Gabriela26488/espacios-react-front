import { BrowserRouter } from "react-router-dom";
import { Rutas } from "./components/utils/Rutas";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Rutas />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
