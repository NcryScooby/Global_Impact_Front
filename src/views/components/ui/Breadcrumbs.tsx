import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { addThreeDots } from '@utils/helpers/addThreeDots';
import { useTheme } from '@hooks/useTheme';
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
      sx={{
        fontSize: '12px',
        color: theme === 'light' ? '#3f3f3f' : '#bdbdbd',
        '& li': { m: 0.4 },
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
