export interface Post {
  posts: [
    {
      id: string;
      title: string;
      content: string;
      image: string;
      tags: [];
      likes: [];
      comments: [];
      category: {
        id: string;
        name: string;
      };
      author: {
        id: string;
        name: string;
        email: string;
        job: {
          id: string;
          name: string;
        };
      };
      createdAt: string;
    }
  ];
}
