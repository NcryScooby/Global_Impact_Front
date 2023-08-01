import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostDetail } from '../view/pages/Posts/PostDetail';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { NewPost } from '../view/pages/Posts/NewPost';
import { Posts } from '../view/pages/Posts/Posts';
import { Register } from '../view/pages/Register';
import { Login } from '../view/pages/Login';
import { Home } from '../view/pages/Home';
import { AuthGuard } from './AuthGuard';

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
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/posts/new" element={<NewPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
