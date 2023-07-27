import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded "
        style={{ backgroundColor: '#111827', color: '#61DAFB', marginLeft: '60px'}}
      >
        <img   
        style={{marginTop: '5px'}}
          src='https://i.ibb.co/DLzNFxV/SIMEXPRO.png'
          alt="react"
          width="100"
        />
      </div>
    </Root>
  );  
}

export default Logo;
