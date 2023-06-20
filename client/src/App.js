import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Protected } from './components';
import Spinner from './components/Spinner';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductInfo from './pages/ProductInfo';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Protected><Home /></Protected>} />
          <Route path='/product/:id' element={<Protected><ProductInfo /></Protected>} />
          <Route path='/profile' element={<Protected><Profile /></Protected>} />
          <Route path='/admin' element={<Protected><Admin /></Protected>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
