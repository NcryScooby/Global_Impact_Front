import { Switch as MuiSwitch, SwitchProps, styled } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const StyledBrightness4Icon = styled(Brightness1Icon)({
  fontSize: '22px',
  color: '#fff200',
});

const StyledBrightness7Icon = styled(DarkModeIcon)({
  fontSize: '22px',
});

export const Switch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    icon={<StyledBrightness4Icon />}
    checkedIcon={<StyledBrightness7Icon />}
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#222222',
        opacity: 1,
        border: 0,
      },
    },
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#59a4ff' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
