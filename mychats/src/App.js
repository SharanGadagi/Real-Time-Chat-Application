import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Join from './Components/Join'
import Chating from './Components/Chating';




function App() {



  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path='/' element={<Join/>}/>
  <Route path='/chating' element={<Chating></Chating>}/>
</Routes>

</BrowserRouter>
    
    </div>
  );
}

export default App;
