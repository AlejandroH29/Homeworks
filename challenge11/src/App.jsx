import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registro } from './components/Register.jsx';
import UserPage from './components/UserPage.jsx';
import { Crud } from './components/Crud.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/user" element={<UserPage />} />
        <Route path='/crud' element={<Crud />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
