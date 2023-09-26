import { RouteChangeListener } from '@utils/helpers/RouteChangeListener';
import { PreviousRouteProvider } from '@contexts/PreviousRouteContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsCategory } from '@pages/Posts/PostsCategory';
import { PostsAuthor } from '@pages/Posts/PostsAuthor';
import { CreatePost } from '@pages/Posts/CreatePost';
import { PostDetail } from '@pages/Posts/PostDetail';
import { AuthLayout } from '@layouts/AuthLayout';
import { Sidebar } from '@components/ui/Sidebar';
import { Register } from '@pages/Auth/Register';
import { SavedPosts } from '@pages/SavedPosts';
import { NotFound } from '@pages/NotFound';
import { Posts } from '@pages/Posts/Posts';
import { Settings } from '@pages/Settings';
import { Login } from '@pages/Auth/Login';
import { Profile } from '@pages/Profile';
import { AuthGuard } from './AuthGuard';
import { Home } from '@pages/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <PreviousRouteProvider>
        <RouteChangeListener />
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
                <Sidebar />
                <AuthGuard isPrivate />
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/posts/category/:categoryId" element={<PostsCategory />} />
            <Route path="/posts/author/:authorId" element={<PostsAuthor />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/saved-posts" element={<SavedPosts />} />
          </Route>
          <Route
            path="*"
            element={<NotFound status={404} title={'Page not found'} model={'page'} />}
          />
        </Routes>
      </PreviousRouteProvider>
    </BrowserRouter>
  );
};
