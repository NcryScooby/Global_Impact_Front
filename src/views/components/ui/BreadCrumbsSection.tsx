interface BreadcrumbSectionProps extends GetPostByIdResponse {}

export const BreadcrumbSection = ({ post }) => (
  <Breadcrumbs
    aria-label="breadcrumb"
    separator={<ChevronRightIcon color="#3f3f3f" width={11} />}
    sx={{
      fontSize: '12px',
      color: '#3f3f3f',
      '& li': { m: 0.25 },
    }}
  >
    <Link to="/">Home</Link>
    <Link to="/posts">Posts</Link>
    <Link to={`/posts/${post.post.id}`}>{post.post.title}</Link>
  </Breadcrumbs>
);
