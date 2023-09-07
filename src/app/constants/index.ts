export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const POST_LIKE_COLORS = {
  LIKED: '#f13636',
  UNLIKED: '#9e9e9e',
};

export const PAGE = {
  POSTS: 'posts',
  CATEGORIES: 'categories',
  AUTHORS: 'authors',
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
};

export const FILTER_OPTIONS = [
  { id: 'desc', name: 'Newest First' },
  { id: 'asc', name: 'Oldest First' },
  { id: 'popularity', name: 'Most Popular' },
  { id: 'views', name: 'Most Viewed' },
];

export const POSTS_TITLE_MAP = {
  [FILTER_OPTIONS[0].id]: 'Latest from blog',
  [FILTER_OPTIONS[1].id]: 'Oldest from blog',
  [FILTER_OPTIONS[2].id]: 'Most popular posts',
  [FILTER_OPTIONS[3].id]: 'Most viewed posts'
};
