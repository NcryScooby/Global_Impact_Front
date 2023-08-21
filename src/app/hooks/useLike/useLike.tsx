import { postsService } from '../../services/postsService';
import { useState, useEffect, useRef } from 'react';
import { POST_LIKE_COLORS } from '../../constants';
import { toast } from 'react-hot-toast';

type UseLikeProps = {
  postId: string;
  user: { id: string };
  initialLikesCount: number;
  postLikes: Array<{ authorId: string }>;
};

export const useLike = ({ postId, user, initialLikesCount, postLikes }: UseLikeProps) => {
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount);
  const [pulse, setPulse] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState<boolean>(false);
  const [color, setColor] = useState<string>(POST_LIKE_COLORS.UNLIKED);
  const lastColorRef = useRef(color);
  const lastPulseRef = useRef(pulse);

  useEffect(() => {
    setLikesCount(initialLikesCount);
  }, [initialLikesCount]);

  const isPostLikedByUser = () => {
    return postLikes?.some((like) => like.authorId === user.id);
  };

  useEffect(() => {
    const isLiked = isPostLikedByUser();
    const newColor = isLiked ? POST_LIKE_COLORS.LIKED : POST_LIKE_COLORS.UNLIKED;

    if (lastColorRef.current !== newColor) {
      setColor(newColor);
      lastColorRef.current = newColor;
    }

    if (lastPulseRef.current !== isLiked) {
      setPulse(isLiked);
      lastPulseRef.current = isLiked;
    }
  }, [postLikes, user]);

  const togglePulse = () => setPulse((prevPulse) => !prevPulse);

  const updateColor = () => {
    setColor((prevColor) =>
      prevColor === POST_LIKE_COLORS.UNLIKED ? POST_LIKE_COLORS.LIKED : POST_LIKE_COLORS.UNLIKED
    );
  };

  const updateLikesBasedOnMessage = (message: string) => {
    const delta = message.includes('Post Liked') ? 1 : -1;
    setLikesCount((prevCount) => prevCount + delta);
  };

  const handleLike = async () => {
    if (like) return;

    setClicked(true);
    setLike(true);

    try {
      togglePulse();
      updateColor();

      const { message } = await postsService.like({
        postId: postId,
      });

      updateLikesBasedOnMessage(message);
    } catch {
      toast.error('Oops, an error occurred');
    } finally {
      setLike(false);
    }
  };

  return {
    likesCount,
    pulse,
    clicked,
    like,
    color,
    handleLike,
  };
};
