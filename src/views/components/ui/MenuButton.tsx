import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MouseEvent, useState } from 'react';
import { useTheme } from '@hooks/useTheme';
import { MenuItem } from '@mui/material';
import { cn } from '@utils/helpers/cn';
import Menu from '@mui/material/Menu';

interface MenuButtonProps {
  className?: string;
  options: {
    onClick: () => void;
    name: string;
    icon?: JSX.Element;
  }[];
  disabled?: boolean;
}

export const MenuButton = ({ className, options, disabled }: MenuButtonProps) => {
  const { theme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color={theme === 'light' ? '#111111' : '#9e9e9e'}
        className={cn(
          `${open ? 'bg-gray-100 dark:bg-black-400' : 'hover:bg-gray-200 dark:hover:bg-black-400'}`,
          className
        )}
      >
        <BiDotsHorizontalRounded size={16} color={'#9d9d9d'} />
      </span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: theme === 'light' ? '#ffffff' : '#222222',
            color: theme === 'light' ? '#111111' : '#9e9e9e',
            borderRadius: '4px',
            '& ul': {
              padding: 0,
            },
          },
        }}
      >
        {options.map(({ name, icon, onClick }) => (
          <MenuItem
            disabled={name === 'Save' || name === 'Delete from saved' ? disabled : false}
            key={name}
            disableRipple
            sx={{
              '&:hover': {
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#2e2e2e',
                color: theme === 'light' ? '#111111' : '#9e9e9e',
              },
              fontSize: '14px',
              padding: '10px 16px',
            }}
            className="flex gap-3"
            onClick={() => {
              setTimeout(() => {
                onClick();
              }, 150);
              handleClose();
            }}
          >
            {icon && <span>{icon}</span>}
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
