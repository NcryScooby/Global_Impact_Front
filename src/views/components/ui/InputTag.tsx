import {
  KeyboardEvent,
  forwardRef,
  ComponentProps,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Input } from '@components/ui/Input';
import toast from 'react-hot-toast';

interface InputTagProps extends ComponentProps<'input'> {
  name: string;
  label?: string;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  setValue: (name: string, value: string[]) => void;
}

export const InputTag = forwardRef<HTMLInputElement, InputTagProps>(
  ({ name, label, tags, setTags, setValue }, ref) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();

        if (e.key === 'Enter' && value) {
          const tagExists = tags.some((tag) => tag.toLowerCase() === value.toLowerCase());

          if (tagExists) {
            toast.error('Tag already exists');
          } else {
            const updatedTags = [...tags, value];
            setTags(updatedTags);
            setValue(name, updatedTags);
            e.currentTarget.value = '';
          }
        }
      },
      [tags, setTags, setValue, name]
    );

    const removeTag = useCallback(
      (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
        setValue(name, updatedTags);
      },
      [tags, setTags, setValue, name]
    );

    const renderedTags = useMemo(() => {
      return tags.map((tag) => (
        <span
          key={tag}
          className="border bg-gray-200 dark:border-hidden dark:text-gray-400 text-black-400 dark:bg-black-500 rounded-[2px] px-2 py-1 inline-flex items-center"
        >
          {tag}
          <AiOutlineClose
            size={12}
            className="ml-2 cursor-pointer"
            onClick={() => removeTag(tag)}
          />
        </span>
      ));
    }, [tags, removeTag]);

    return (
      <>
        <span className={`block ${label ? 'mb-2' : ''} text-[13px] text-gray-500`}>{label}</span>

        <div className="relative">
          <input type="hidden" name={name} value={tags} ref={ref} />
          <Input
            name="tags-input"
            onKeyDown={handleKeyDown}
            className="dark:placeholder-black-200 text-sm"
            placeholder="Press enter to add tags"
            prependComponent={renderedTags}
          />
        </div>
      </>
    );
  }
);

InputTag.displayName = 'InputTag';
