import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import BlogData from './Components/BlogData';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/:title' element={<BlogData/>} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
