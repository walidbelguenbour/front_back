import Navbar from "./components/Navbar";
import Accueil from './Pages/Accueil';
import Login from './Pages/Login';
import Signaler from './components/Signaler';
import {Route , Routes} from 'react-router-dom'
function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Accueil/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signaler' element={<Signaler/>} />
        </Routes>
    </>
  );
}

export default App;
