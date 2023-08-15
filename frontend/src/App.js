import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Input from './Components/Input';
import Edit from './Components/Edit';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/createEvent' element={<Input/>}></Route>
          <Route path='/editEvent/:id' element={<Edit/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
