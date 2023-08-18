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
  onDelete: (id: string) => void;
}

export const CommentList = ({ comments, userId, onDelete }: CommentProps) => {
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
                } rounded-[2px] bg-white relative border border-gray-300`}
              >
                <Comment
                  key={index}
                  comment={comment}
                  userId={userId}
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
