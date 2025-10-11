import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registro } from './components/Register.jsx';
import UserPage from './components/UserPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
