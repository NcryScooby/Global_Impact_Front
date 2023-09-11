import { Comment } from './Comment';

interface CommentProps {
  comments: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
      job: {
        id: string;
        name: string;
      };
    };
    content: string;
    createdAt: string;
  }[];
  userId: string;
  userRole: string;
  onDelete: (id: string) => void;
}

export const CommentList = ({ comments, userId, userRole, onDelete }: CommentProps) => {
  return (
    <>
      <div className="px-4 lg:px-8">
        {
          // prettier-ignore
          comments.length > 0
            ? comments.map((comment, index) => (
              <div
                key={index}
                className={`py-4 lg:py-8 ${
                  index === 0 ? 'mt-8' : 'mt-3 lg:mt-6'
                } rounded-[2px] bg-white dark:bg-black-600 relative border border-gray-300 dark:border-black-500`}
              >
                <Comment
                  key={index}
                  comment={comment}
                  userId={userId}
                  userRole={userRole}
                  onDelete={onDelete}
                />
              </div>
            ))
            : null
        }
      </div>
    </>
  );
};
