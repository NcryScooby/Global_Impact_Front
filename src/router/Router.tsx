import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsCategory } from '@pages/Posts/PostsCategory';
import { PostsAuthor } from '@pages/Posts/PostsAuthor';
import { CreatePost } from '@pages/Posts/CreatePost';
import { PostDetail } from '@pages/Posts/PostDetail';
import { AuthLayout } from '@layouts/AuthLayout';
import { Sidebar } from '@components/ui/Sidebar';
import { Register } from '@pages/Auth/Register';
import { NotFound } from '@pages/NotFound';
import { Posts } from '@pages/Posts/Posts';
import { Login } from '@pages/Auth/Login';
import { useAuth } from '@hooks/useAuth';
import { AuthGuard } from './AuthGuard';
import { Home } from '@pages/Home';

export const Router = () => {
  const { signOut, userAvatar } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route
          element={
            <>
              <Sidebar signOut={signOut} userAvatar={userAvatar} />
              <AuthGuard isPrivate />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/posts/categories/:categoryId" element={<PostsCategory />} />
          <Route path="/posts/authors/:authorId" element={<PostsAuthor />} />
          <Route path="/posts/create" element={<CreatePost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
