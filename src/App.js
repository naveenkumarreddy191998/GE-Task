import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link,useNavigate } from "react-router-dom";
import {WrapperLogin} from './login';
import Register from './register';
import Home from './home';
import Company from './company';

function NotFoundPage() {
  return <div className="page">🧐 Page not found </div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<NotFoundPage />} />

        <Route path="login" element={<WrapperLogin />} />
        <Route path="/" element={<Home />} />

        <Route path="register" element={<Register />} />
        <Route path="company" element={<Company />}/>

      </Routes>
    </BrowserRouter>)
}

export default App;
