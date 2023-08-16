import { PostsCategory } from '../views/pages/Posts/PostsCategory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsAuthor } from '../views/pages/Posts/PostsAuthor';
import { PostDetail } from '../views/pages/Posts/PostDetail';
import { AuthLayout } from '../views/layouts/AuthLayout';
import { Register } from '../views/pages/Auth/Register';
import { NewPost } from '../views/pages/Posts/NewPost';
import { NotFound } from '../views/pages/NotFound404';
import { Posts } from '../views/pages/Posts/Posts';
import { Login } from '../views/pages/Auth/Login';
import { Home } from '../views/pages/Home';
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
          <Route
            path="/posts/categories/:categoryId"
            element={<PostsCategory />}
          />
          <Route path="/posts/authors/:authorId" element={<PostsAuthor />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
