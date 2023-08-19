import { PostsCategory } from '../views/pages/Posts/PostsCategory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsAuthor } from '../views/pages/Posts/PostsAuthor';
import { PostDetail } from '../views/pages/Posts/PostDetail';
import { AuthLayout } from '../views/layouts/AuthLayout';
import { Sidebar } from '../views/components/ui/Sidebar';
import { Register } from '../views/pages/Auth/Register';
import { NewPost } from '../views/pages/Posts/NewPost';
import { NotFound } from '../views/pages/NotFound';
import { Posts } from '../views/pages/Posts/Posts';
import { Login } from '../views/pages/Auth/Login';
import { useAuth } from '../app/hooks/useAuth';
import { Home } from '../views/pages/Home';
import { AuthGuard } from './AuthGuard';

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
          <Route
            path="/posts/categories/:categoryId"
            element={<PostsCategory />}
          />
          <Route path="/posts/authors/:authorId" element={<PostsAuthor />} />
          <Route path="/posts/new" element={<NewPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
