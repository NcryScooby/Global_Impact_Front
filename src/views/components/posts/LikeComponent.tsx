import { HeartFilledIcon } from '@radix-ui/react-icons';

interface LikeComponentProps {
  likesCount: number;
  color: string;
  pulse: boolean;
  clicked: boolean;
  like: boolean;
  handleLike: () => void;
}

export const LikeComponent = ({
  likesCount,
  color,
  pulse,
  clicked,
  like,
  handleLike,
}: LikeComponentProps) => {
  return (
    <>
      <HeartFilledIcon
        height={16}
        width={16}
        color={color}
        cursor={'pointer'}
        className={clicked ? (pulse ? 'animate-pulselike' : 'animate-pulsedislike') : ''}
        onClick={like ? undefined : handleLike}
      />
      <p>{likesCount}</p>
    </>
  );
};
