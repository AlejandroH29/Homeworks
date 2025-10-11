import { useSelector, useDispatch } from 'react-redux';
import { logoutFirebase } from '../store/slices/thunks';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector(state => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutFirebase());
    navigate(-1); // Go back to previous page
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Bienvenido</h2>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
