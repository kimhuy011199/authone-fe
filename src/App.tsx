import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './stores/hook';
import { RootState } from './stores';
import { getMe } from './stores/users/userSlice';
import authStorageService from './shared/services/authStorage.service';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import SetupMfa from './pages/SetupMfa';

const App = () => {
  const accessToken = authStorageService().getToken();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (accessToken && !user?.email) {
      dispatch(getMe());
    }
  }, [user, dispatch, accessToken]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/setup-mfa" element={<SetupMfa />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
