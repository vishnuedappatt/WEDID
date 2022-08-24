import LoginPage from "./pages/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {AuthProvider} from './context/authcontext'
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";

function App() {
  return (
    <div >

      <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />}/>                        
            </Routes>
        </AuthProvider>
      </BrowserRouter>    
        
     
    </div>
  );
}

export default App;