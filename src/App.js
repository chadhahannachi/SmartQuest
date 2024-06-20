import './App.css';
import Home from './Home'; // Importez le composant Home
import NavbarComponent from './NavbarComponent';
import Sidebar from './Sidebar';
import Login from './auth/Login';
import Newpwd from './auth/Newpwd';
import Registration from './auth/Registration';
import Resetpwd from './auth/Resetpwd';
// import { SignupForm } from './auth/SignupForm';
import UserList from './user/UserList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpwd" element={<Resetpwd />} />
        <Route path="/newpwd" element={<Newpwd />} />
        {/* <Route path="/NewPassword" element={<Newpass />} /> 
        <Route path="/verifemail" element={<Verifemail />} />  */}

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <>
      <NavbarComponent />
      <div className="container">
        <Sidebar className="sidebar" />
        <div className="content">
          <Routes>
            <Route path="/listuser" element={<UserList />} />

            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
