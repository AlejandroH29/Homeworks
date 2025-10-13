import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registro } from './components/Register.jsx';
import UserPage from './components/UserPage.jsx';
import { Crud } from './components/Crud.jsx';
import DataComponent from './components/DataComponent.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/user" element={<UserPage />} />
        <Route path='/crud' element={<Crud />}/>
        <Route path='/realtime' element={<DataComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
