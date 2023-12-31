import { useEffect, useState } from 'react';
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
import NewPassword from './pages/NewPassword';
import Loading from './shared/components/Loading';

const App = () => {
  const accessToken = authStorageService().getToken();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUser = async () => {
    try {
      if (accessToken && !user?.email) {
        await dispatch(getMe()).unwrap();
      }
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, [user, dispatch, accessToken]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/setup-mfa" element={<SetupMfa />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
