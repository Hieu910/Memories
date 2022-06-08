
import {Container } from '@material-ui/core'

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter ,Routes, Route, } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
          <NavBar/>
            <Routes>
              <Route path='/'  element={<Home/>}></Route>
              <Route path='/auth'  element={<Auth/>}></Route>
            </Routes>
      </Container>
    </BrowserRouter>
  
  );
}

export default App;
