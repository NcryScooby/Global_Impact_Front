import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { Register } from '../view/pages/Register';
import { Login } from '../view/pages/Login';
import { Home } from '../view/pages/Home';
import { AuthGuard } from './AuthGuard';
import { Settings } from '../view/pages/Settings';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
