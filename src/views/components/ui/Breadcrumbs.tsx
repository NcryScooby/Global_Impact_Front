import { addThreeDots } from '../../../app/utils/helpers/addThreeDots';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useTheme } from '../../../app/hooks/useTheme';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  links: {
    label: string;
    to: string;
  }[];
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  const { theme } = useTheme();

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon color={theme === 'light' ? '#3f3f3f' : '#bdbdbd'} width={11} />}
      sx={{
        fontSize: '12px',
        color: theme === 'light' ? '#3f3f3f' : '#bdbdbd',
        '& li': { m: 0.25 },
      }}
    >
      {links.map((link, index) => (
        <Link key={index} to={link.to}>
          {addThreeDots(link.label, 80)}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};
